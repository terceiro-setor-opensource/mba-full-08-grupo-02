import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";
import { ExtendedPlace } from "src/domains/Place";
import { EventResponse } from "src/domains/Event";
import { FeedbackResponse } from "src/domains/Feedback";
import { BenefitsByPlaceIdResponse } from "src/domains/PlaceByActivity";
import { PostgrestError } from "@supabase/supabase-js";

export interface PlaceSelectFilter {
  pg?: number;
  order_by?: string;
  order?: string;
  searchByNameDescription?: string;
  searchBySportId?: number;
  searchByCity?: string;
}

const placeSchema = {
  name: z.string().min(1),
  description: z.string().min(1),
  address_id: z.number().int().positive(),
  maps_link: z.string().optional(),
  link_social: z.string().optional(),
  opening_time: z.string().min(5).max(5),
  closing_time: z.string().min(5).max(5),
  is_24: z.boolean().optional(),
  days_of_week: z.string().min(1),
  restrictions: z.string().optional(),
  observations: z.string().optional(),
};

export default class PlaceController {
  static async findAll(req: Request, res: Response) {
    const PlaceRef = supabase.from("place");

    const {
      order,
      order_by,
      pg,
      searchByCity,
      searchByNameDescription,
      searchBySportId,
    } = (req.query as unknown as PlaceSelectFilter) || {};

    const isForeignOrder = {
      feedback_rating: "feedback(rating)",
      distance: "address(postalcode)",
    };

    const orderBy =
      isForeignOrder[(order_by || "") as keyof typeof isForeignOrder] ||
      order_by ||
      "name";

    let findAllPlaces = PlaceRef.select(
      `
        *,
        address(*),
        place_image(imageid),
        feedback(rating),
        event(*),
        place_by_activity(activity(*))`
    ).order(orderBy, {
      ascending: order && order === "DESC" ? false : true,
    });

    if (searchByNameDescription) {
      findAllPlaces = findAllPlaces.or(
        `name.ilike.%${searchByNameDescription}%,description.ilike.%${searchByNameDescription}%`
      );
    }

    if (searchBySportId) {
      findAllPlaces = findAllPlaces
        .eq("place_by_activity.activity.id", searchBySportId)
        .not("place_by_activity", "is", null)
        .not("place_by_activity.activity", "is", null);
    }

    if (searchByCity) {
      const brokenCityInfo = searchByCity.split("-");
      brokenCityInfo.splice(-1);
      const city = brokenCityInfo.join("-");
      const state = searchByCity.split("-").at(-1);
      findAllPlaces = findAllPlaces
        .ilike("address.city", `%${city}%`)
        .ilike("address.state", `%${state}%`)
        .not("address", "is", null);
    }

    const { data, error } = await findAllPlaces;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No places found",
      });
    }
    const places: ExtendedPlace[] = data?.map((place) => {
      return {
        ...place,
        address: place.address,
        image:
          "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating_avg:
          place.feedback.reduce(
            (acc: number, curr: FeedbackResponse) => acc + curr.rating,
            0
          ) / place.feedback.length,
      };
    });

    res.status(201).json(places);
  }

  static async findById(req: Request, res: Response) {
    const PlaceRef = supabase.from("place");
    const { id } = req.params;
    const { data, error } = await PlaceRef.select(
      `*,
      address(*),
      place_image(imageid),
      feedback(*,users(name)),
      event(*),
      place_by_activity(activity(*, activity_benefit(benefit(*))))`
    )
      .eq("id", id)
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: `No place found for the id = ${id}`,
      });
    }

    res.status(201).json({
      ...data,
      address: data.address,
      events: (data.event || []).map((event: EventResponse) => {
        return {
          ...event,
          banner:
            "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        };
      }),
      image:
        "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating_avg:
        data.feedback.reduce(
          (acc: number, curr: FeedbackResponse) => acc + curr.rating,
          0
        ) / data.feedback.length,
    });
  }
  

  static async create(req: Request, res: Response) {
    const PlaceRef = supabase.from("place");
    const { body } = req;

    const ZPlaceSchema = z.object(placeSchema);
    const validation = ZPlaceSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const placeInserted = await PlaceRef.insert(body).select();

    const { error } = placeInserted;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "inserting a new Place"
          ).returnObjectRequestError()
        );

    const { data } = placeInserted;

    res.status(201).json(data);
  }

  static async update(req: Request, res: Response) {
    const PlaceRef = supabase.from("place");
    const { id } = req.params;
    const { body } = req;

    if (!id) {
      return res.status(404).json({
        status: 404,
        message: `id was not provided`,
      });
    }

    const ZPlaceSchema = z.object(placeSchema);
    const validation = ZPlaceSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const updatedPlace = await PlaceRef.update(body, { count: "exact" }).eq(
      "id",
      String(id) // Não sei pq, mas só funcionou quando dei parse pra string
    );

    const { error, count } = updatedPlace;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "updating Place"
          ).returnObjectRequestError()
        );

    res.status(201).json({
      code: 201,
      status: "OK",
      message: `Rows affected -> ${count}`,
    });
  }

  static async delete(req: Request, res: Response) {
    const PlaceRef = supabase.from("place");
    const { body } = req;

    const DeleteSchema = z.object({
      id: z.number().int(),
      userId: z.number().int(),
    });
    const validation = DeleteSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    // In the future there will be here a validation to see if the user with the userId has the permission to delete a place from the database

    const deletedPlace = await PlaceRef.delete({ count: "exact" }).eq(
      "id",
      body.id
    );

    const { error, count } = deletedPlace;
    if (error)
      return res
        .send(401)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "removing Place"
          ).returnObjectRequestError()
        );

    res
      .status(201)
      .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
  }

  
  static async findBenefitsByPlaceId(req: Request, res: Response) {
    const { id } = req.params;
    
     const { data: benefitsData, error } = await supabase
     .from('place')
     .select(`
       id,
       place_by_activity (
         activity (
           *,
           activity_benefit (
             benefit (*)
           )
         )
       )
     `)
     .eq('id', id)
     .limit(1)
     .single() as {data:BenefitsByPlaceIdResponse, error: PostgrestError | null};

    if(error) {
      return res.status(500).json({ error: error.message });
    }

    if (!benefitsData) {
      return res.status(204).json({
        message: `No benefits found for the place id = ${id}`,
      });
    }

    const activities = benefitsData.place_by_activity.map(
      (item) => item.activity.name
    );

    const benefits = benefitsData.place_by_activity.flatMap(
      (item) =>
        item.activity.activity_benefit.map((b) => ({
          id: b.benefit.id,
          name: b.benefit.name,
          description: b.benefit.description,
          activity: item.activity.name,
          icon: b.benefit.icon,
        }))
    );

    res.status(201).json({
      activities,
      benefits
    });

  }
}
