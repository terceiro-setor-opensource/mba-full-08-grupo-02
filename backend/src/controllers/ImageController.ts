import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const ImageRef = supabase.from("image");

const imageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().optional(),
});

export default class ImageController {
  static async findAll(req: Request, res: Response) {
    const { data, error } = await ImageRef.select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No image found",
      });
    }

    res.status(201).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { data, error } = await ImageRef.select("*")
      .eq("id", id)
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: `No image found for the id = ${id}`,
      });
    }

    res.status(201).json(data);
  }

  static async create(req: Request, res: Response) {
    const { body } = req;

    const validation = imageSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const insertedImage = await ImageRef.insert(body).select();

    const { error } = insertedImage;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "inserting a new Image"
          ).returnObjectRequestError()
        );

    res.status(201).json(insertedImage.data);
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

    const validation = imageSchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const updatedImage = await ImageRef.update(body, { count: "exact" }).eq(
      "id",
      String(id) // Não sei pq, mas só funcionou quando dei parse pra string
    );

    const { error, count } = updatedImage;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "updating Image"
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

    const deletedImage = await ImageRef.delete({ count: "exact" }).eq(
      "id",
      body.id
    );

    const { error, count } = deletedImage;
    if (error)
      return res
        .send(401)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "removing Image"
          ).returnObjectRequestError()
        );

    res
      .status(201)
      .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
  }
}
