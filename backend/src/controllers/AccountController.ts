import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import ErrorHandling from "../util/ErrorHandling";
import { z } from "zod";

const AccountRef = supabase.from("account");

const insertBodySchema = z.object({
  email: z.string().email().min(1),
  phonenumber: z.string().min(1),
  password: z.string().min(1),
  accounttypeid: z.number().int(),
});

export default class AccountTypeController {
  static async findAll(req: Request, res: Response) {
    const { data, error } = await AccountRef.select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: "No account found",
      });
    }

    res.status(201).json(data);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { data, error } = await AccountRef.select("*").eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(204).json({
        message: `No account found for the id = ${id}`,
      });
    }

    res.status(201).json(data);
  }

  static async create(req: Request, res: Response) {
    const { body } = req;

    const validation = insertBodySchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    // implement a hash for the password
    const inserted = await AccountRef.insert(body).select();

    const { error } = inserted;
    if (error)
      return res
        .status(404)
        .json(
          new ErrorHandling(
            error.code,
            error.message,
            "inserting a new account"
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

    const validation = insertBodySchema.safeParse(body);
    if (validation.error) {
      return res.status(404).json({
        status: 404,
        message: `Validation error`,
        errors: validation.error.errors,
      });
    }

    const updated = await AccountRef.update(body, { count: "exact" }).eq(
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
            "updating account"
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

    const deleted = await AccountRef.delete({ count: "exact" }).eq(
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
            "removing account"
          ).returnObjectRequestError()
        );

    res
      .status(201)
      .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
  }
}
