import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const UserRef = supabase.from("users");
const PlaceRef = supabase.from("place");
const FavoritePlaceRef = supabase.from("favorite_place");

const favoritePlaceSchema = z.object({
  placeid: z.number().int().positive(),
  userid: z.number().int().positive(),
});

export default class FavoritePlaceController {
  static async findAll(req: Request, res: Response) {
    const { data, error } = await FavoritePlaceRef.select(
      "users(id, name), place(*)"
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No favorite place found",
      });
    }

    res.status(201).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { userid } = req.params;
    const { data, error } = await FavoritePlaceRef.select(
      "users(id, name), place(*)"
    ).eq("userid", userid);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: `No favorite place found for the id = ${userid}`,
      });
    }

    res.status(201).json(data);
  }

  static async create(req: Request, res: Response) {
    const { body } = req;

    const validation = favoritePlaceSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    // checking if the user exists
    const resultUser = await UserRef.select("name").eq("id", body.userid);

    if (resultUser.error) {
      return res.status(500).json({ error: resultUser.error.message });
    }

    if (resultUser.data.length === 0) {
      return res.status(404).json({
        message: `No user found for the id = ${body.userid}`,
      });
    }

    // checking if the place exists
    const resultPlace = await PlaceRef.select("name").eq(
      "id",
      String(body.placeid)
    );

    if (resultPlace.error) {
      return res.status(500).json({ error: resultPlace.error.message });
    }

    if (resultPlace.data.length === 0) {
      return res.status(404).json({
        message: `No place found for the id = ${body.placeid}`,
      });
    }

    // checking if the place has already been set as favorite by the user
    const resultFavorite = await FavoritePlaceRef.select("id")
      .eq("placeid", body.placeid)
      .eq("userid", body.userid);

    if (resultFavorite.error) {
      return res.status(500).json({ error: resultFavorite.error.message });
    }

    if (resultFavorite.data.length > 0) {
      return res.status(404).json({
        message: `This place has already been set as favorite by this user`,
      });
    }

    // Everithing is ok, so insert
    const inserted = await FavoritePlaceRef.insert(body).select(
      "users(id, name), place(*)"
    );

    const { error } = inserted;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "inserting a new favorite place"
          ).returnObjectRequestError()
        );

    res.status(201).json(inserted.data);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    if (!id) {
      return res.status(404).json({
        status: 404,
        message: `id was not provided`,
      });
    }

    const validation = favoritePlaceSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const updated = await FavoritePlaceRef.update(body, { count: "exact" }).eq(
      "id",
      id // Não sei pq, mas só funcionou quando dei parse pra string
    );

    const { error, count } = updated;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "updating favorite place"
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

    const DeleteSchema = z.object({
      id: z.number().int(),
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

    const deleted = await FavoritePlaceRef.delete({ count: "exact" }).eq(
      "id",
      body.id
    );

    const { error, count } = deleted;
    if (error)
      return res
        .send(401)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "removing favorite place"
          ).returnObjectRequestError()
        );

    res
      .status(201)
      .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
  }
}
