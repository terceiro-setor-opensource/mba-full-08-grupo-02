import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const feedbackSchema = z.object({
  placeid: z.number().int().positive(),
  userid: z.number().int().positive(),
  rating: z.number().positive(),
  description: z.string(),
});

export default class FeedbackController {
  static async findAll(req: Request, res: Response) {
    const FeedbackRef = supabase.from("feedback");
    const { data, error } = await FeedbackRef.select(
      "id, description, rating, users(name), place(name)"
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
    const FeedbackRef = supabase.from("feedback");
    const { id } = req.params;
    const { data, error } = await FeedbackRef.select(
      "id, description, rating, users(name), place(name)"
    )
      .eq("id", id)
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(204).json({
        message: `No feedback found for the id = ${id}`,
      });
    }

    res.status(201).json(data);
  }

  static async findFeebaacksByPlace(req: Request, res: Response) {
    const FeedbackRef = supabase.from("feedback");
    const { id, order_by = "id", order = "ASC" } = req.params;
    const { data, error } = await FeedbackRef.select(
      "id, description, rating, users(name), place(name)"
    )
      .eq("placeid", id)
      .order(order_by, { ascending: order === "ASC" });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(204).json({
        message: `No feedback found for the id = ${id}`,
      });
    }

    res.status(201).json(data);
  }

  static async create(req: Request, res: Response) {
    const FeedbackRef = supabase.from("feedback");
    const { body } = req;

    if (!body) {
      return res.status(404).json({
        status: 404,
        message: `Empty body`,
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

    // checking if the user exists
    const resultUser = await supabase
      .from("users")
      .select("id, name")
      .eq("accountid", body.userid)
      .limit(1)
      .single();

    if (resultUser.error) {
      return res.status(500).json({ error: resultUser.error.message });
    }

    if (!resultUser.data) {
      return res.status(404).json({
        message: `No user found for the accountid = ${body.userid}`,
      });
    }

    // checking if the place exists
    const resultPlace = await supabase
      .from("place")
      .select("name")
      .eq("id", String(body.placeid));

    if (resultPlace.error) {
      return res.status(500).json({ error: resultPlace.error.message });
    }

    if (resultPlace.data.length === 0) {
      return res.status(404).json({
        message: `No place found for the id = ${body.placeid}`,
      });
    }

    // Everithing is ok, so insert
    const inserted = await FeedbackRef.insert({
      ...body,
      userid: resultUser.data.id,
    }).select("description, rating, users(name), place(name)");

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
    const FeedbackRef = supabase.from("feedback");
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
    const FeedbackRef = supabase.from("feedback");
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
