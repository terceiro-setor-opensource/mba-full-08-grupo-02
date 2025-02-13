import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const favoritePlaceSchema = z.object({
  placeid: z.number().int().positive(),
  userid: z.number().int().positive(),
});

export default class FavoritePlaceController {
  static async findAll(req: Request, res: Response) {

    const { data, error } = await supabase.from('favorite_place')
    .select("users(id, name), place(*)");

    if (error) {
      return res.status(500).json({ error: error.message, favorite: data });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No favorite place found",
      });
    }

    return res.status(201).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { userid } = req.params;
    const { data, error } = await supabase.from('favorite_place').select(
      "users(id, name), place(*)"
    ).eq("userid", userid).limit(1).single();

    // if (error) {
    //   return res.status(500).json({ error: error.message, byId: data });
    // }

    if (data === null) {
      return res.status(204).json({
        message: `No favorite place found for the id = ${userid}`,
      });
    }

    res.status(201).json(data);
  }

  static async verifyIsFavorite(req: Request, res: Response) {

    const { placeid } = req.params;
    const { userid } = req.query;

    if (!userid || !placeid) {
      return res.status(400).json({ error: "Parametros obrigatórios não informados" });
    }

    const { data, error } = await supabase
    .from('favorite_place')
    .select("id, users(id, name), place(*)")
    .eq("userid", userid)
    .eq("placeid", placeid)
    .limit(1)
    .single();

    if (!data) {
      return res.status(200).json({ isFavorite: false  });
   } 

    return res.status(200).json({ 
      isFavorite: true,
      id: data.id,  
    });
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
    const resultUser = await supabase.from("users").select("name").eq("id", body.userid);

    if (resultUser.error) {
      return res.status(500).json({ error: resultUser.error.message });
    }

    if (resultUser.data.length === 0) {
      return res.status(404).json({
        message: `No user found for the id = ${body.userid}`,
      });
    }

    // checking if the place exists
    const resultPlace = await supabase.from("place").select("name").eq(
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
    const resultFavorite = await supabase.from('favorite_place').select("id")
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
    const inserted = await supabase.from('favorite_place').insert(body).select(
      "users(id, name), place(*), id"
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

    res.status(201).json(inserted);
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

    const updated = await supabase.from('favorite_place').update(body, { count: "exact" }).eq(
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
      favoriteId: z.number().int(),
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

    const deleted = await supabase.from('favorite_place').delete({ count: "exact" }).eq(
      "id",
      body.favoriteId
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
