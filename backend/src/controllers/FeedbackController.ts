import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const UserRef = supabase.from("users");
const PlaceRef = supabase.from("place");
const FeedbackRef = supabase.from("feedback");

const feedbackSchema = z.object({
  placeid: z.number().int().positive(),
  userid: z.number().int().positive(),
  rating: z.number().positive(),
  description: z.string(),
});

export default class FeedbackController {
  static async findAll(req: Request, res: Response) {
    const { data, error } = await FeedbackRef.select(
      "description, rating, users(name), place(name)"
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No feedback found",
      });
    }

    res.status(201).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { data, error } = await FeedbackRef.select(
      "description, rating, users(name), place(name)"
    ).eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: `No feedback found for the id = ${id}`,
      });
    }

    res.status(201).json(data);
  }

  static async create(req: Request, res: Response) {
    const { body } = req;

    const validation = feedbackSchema.safeParse(body);
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
    const resultPlace = await PlaceRef.select("name").eq("id", String(body.placeid));

    if (resultPlace.error) {
      return res.status(500).json({ error: resultPlace.error.message });
    }

    if (resultPlace.data.length === 0) {
      return res.status(404).json({
        message: `No place found for the id = ${body.placeid}`,
      });
    }

    // Everithing is ok, so insert
    const inserted = await FeedbackRef.insert(body).select(
      "description, rating, users(name), place(name)"
    );

    const { error } = inserted;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "inserting a new feedback"
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

    const validation = feedbackSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const updated = await FeedbackRef.update(body, { count: "exact" }).eq(
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
            "updating feedback"
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

    const deleted = await FeedbackRef.delete({ count: "exact" }).eq(
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
            "removing feedback"
          ).returnObjectRequestError()
        );

    res
      .status(201)
      .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
  }
}
