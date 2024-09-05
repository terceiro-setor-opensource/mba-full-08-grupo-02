import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import PlaceResponse from "src/domains/Place";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const PlaceRef = supabase.from("place");

const insertBodySchema = {
  name: z.string().min(1),
  description: z.string().min(1),
  addressId: z.number().int().positive(),
  mapsLink: z.string().optional(),
  linkSocial: z.string().optional(),
  openingTime: z.string().min(5).max(5),
  closingTime: z.string().min(5).max(5),
  is24: z.boolean().optional(),
  daysOfWeek: z.string().min(1),
  restrictions: z.string().optional(),
  observations: z.string().optional(),
};

const updateBodySchema = {
  id: z.number().int(),
  ...insertBodySchema,
};

export default class PlaceController {
  static async create(req: Request, res: Response) {
    const { body } = req;

    const ZPlaceSchema = z.object(insertBodySchema);
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

  static async findAll(req: Request, res: Response) {
    const { data } = await PlaceRef.select("*");
    res.status(201).json(data);
  }

  static async update(req: Request, res: Response) {
    const { body } = req;

    const ZPlaceSchema = z.object(updateBodySchema);
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
      String(body.id) // Não sei pq, mas só funcionou quando dei parse pra string
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
    const { body } = req;

    if (!body) {
      return res.status(404).json({ status: 404, message: "Empty body" });
    }

    const { id, userId } = body;

    if (!id || !userId)
      return res
        .status(404)
        .json({ status: 404, message: "Please fill all the mandatory fields" });

    // In the future there will be here a validation to see if the user with the userId has the permission to delete a place from the database

    const deletedPlace = await PlaceRef.delete({ count: "exact" }).eq("id", id);

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
}
