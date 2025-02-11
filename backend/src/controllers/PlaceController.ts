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
  name?: string;
  sport?: number;
  city?: string;
}

const placeSchema = {
  name: z.string().min(1),
  description: z.string().min(1),
  address_id: z.number().int().positive().optional(),
  maps_link: z.string().optional(),
  link_social: z.string().optional(),
  opening_time: z.string().min(5).max(5).default("08:00"),
  closing_time: z.string().min(5).max(5).default("18:00"),
  is_24: z.boolean().optional(),
  days_of_week: z.string().min(1).default("0123456"),
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
      city,
      name,
      sport,
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
        place_image(image(*)),
        feedback(rating),
        event(*),
        place_by_activity(activity(*))`
    ).order(orderBy, {
      ascending: order && order === "DESC" ? false : true,
    });

    if (name) {
      findAllPlaces = findAllPlaces.or(
        `name.ilike.%${name}%,description.ilike.%${name}%`
      );
    }

    if (sport) {
      findAllPlaces = findAllPlaces
        .eq("place_by_activity.activity.id", sport)
        .not("place_by_activity", "is", null)
        .not("place_by_activity.activity", "is", null);
    }

    if (city) {
      findAllPlaces = findAllPlaces
        .ilike("address.city", `%${city}%`)
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
      place_image(image(*)),
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

    const firstImageUrl = data.place_image[0]?.imageid ?? data.place_image[0]?.image?.id;
    const {data: imgData, error: imageError } = await supabase.from("image").select("*").eq("id", firstImageUrl).single();
   
   return res.status(201).json({
      ...data,
      address: data.address,
      events: (data.event || []).map((event: EventResponse) => {
        return {
          ...event,
          banner:
            "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        };
      }),
      image: imgData?.url || 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        errors: validation.error.errors,
      });
    }

    try {
      const { address, images, activities, ...placeData } = body;

      const { data: addressData, error: addressError } = await supabase
        .from("address")
        .insert([address])
        .select("id")
        .single();

      if (addressError) throw addressError;
      const address_id = addressData.id;

      const placeDataToInsert = {
        ...placeData,
        address_id,
        opening_time: placeData.opening_time || "08:00",
        closing_time: placeData.closing_time || "18:00",
        days_of_week: placeData.days_of_week || "0123456",
      };

      const { data: placeDataInserted, error: placeError } = await supabase
        .from("place")
        .insert([placeDataToInsert])
        .select("id")
        .single();

      if (placeError) throw placeError;
      const place_id = placeDataInserted.id;

      if (images && images.length > 0) {
        const payloadToInsertImages = images.map((image) => ({
          url: image,
          alt: 'Imagem de: ' + placeData.name,
        }));

        const { data: imageInsertData, error: imageError } = await supabase
          .from("image")
          .insert(payloadToInsertImages)
          .select("id");

        if (imageError) throw imageError;

        const placeImageInsertData = imageInsertData?.map((image) => ({
          placeid: place_id, 
          imageid: image.id,
        })) || [];

        const { error: placeImageError } = await supabase
          .from("place_image")
          .insert(placeImageInsertData);

        if (placeImageError) throw placeImageError;
      }


      for (const activity of activities) {
        // Insert activity if not exists
        const { data: newActivity, error: activityError } = await supabase
          .from("activity")
          .insert([{ name: activity.name }])
          .select("id")
          .single(); // We expect a single result for the activity insert

        if (activityError) throw activityError;
        let activity_id = newActivity.id;
        
        if(!activity_id && !place_id){
          throw new Error('Activity or Place ID not found');
        }

        // Link Activity to Place
        const { error: placeActivityError } = await supabase
          .from("place_by_activity")
          .insert([{ placeid: place_id, activityid: activity_id }]);

        if (placeActivityError) throw placeActivityError;

        // Insert Benefits
        for (const benefit of activity.benefits) {
          let benefit_id = benefit.id;

          // Check if the benefit already exists
          const { data: existingBenefit, error: benefitExistError } = await supabase
            .from("benefit")
            .select("id")
            .eq("name", benefit.name)
            .limit(1);  // Limiting to 1 result in case of multiple entries

          if (benefitExistError) throw benefitExistError;

          if (existingBenefit && existingBenefit.length > 0) {
            // If the benefit already exists, use the existing benefit ID
            benefit_id = existingBenefit[0].id;
          } else {
            // If the benefit does not exist, insert it and get the new benefit ID
            const { data: newBenefit, error: benefitError } = await supabase
              .from("benefit")
              .insert([{ name: benefit.name, description: benefit.description  ?? '' }])
              .select("id")
              .single();  // Now it will insert and return a single row
        
            if (benefitError) throw benefitError;
            benefit_id = newBenefit.id;
          }


          // Link Benefit to Activity
          const { error: activityBenefitError } = await supabase
            .from("activity_benefit")
            .insert([{ activity_id, benefit_id }]);

          if (activityBenefitError) throw activityBenefitError;
        }
      }

      // ✅ Return Created Place
      res.status(201).json({ id: place_id, message: "Place created successfully" });
    } catch (error) {
      console.error("Error creating place:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message || error,
      });
    }
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

  static async findPlaceDetails(req: Request, res: Response) {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("place")
      .select(`
        *,
        address(*),
        place_image(imageid),
        event(*),
        feedback(*, users(name)),
        place_by_activity(activity(*, activity_benefit(benefit(*))))
      `)
      .eq("id", id)
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(204).json({
        message: `No place found for the id = ${id}`,
      });
    }

    // Process the response
    res.status(200).json({
      ...data,
      address: data.address,
      events: (data.event || []).map((event: EventResponse) => ({
        ...event,
        banner:
          "https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      })),
      images: data.place_image,
      rating_avg:
        data.feedback.reduce(
          (acc: number, curr: FeedbackResponse) => acc + curr.rating,
          0
        ) / (data.feedback.length || 1),
      activities: data.place_by_activity.map((item: any) => ({
        id: item.activity.id,
        name: item.activity.name,
        description: item.activity.description,
        benefits: item.activity.activity_benefit.map((b: any) => ({
          id: b.benefit.id,
          name: b.benefit.name,
          description: b.benefit.description,
          icon: b.benefit.icon,
        })),
      })),
    });
}

}
