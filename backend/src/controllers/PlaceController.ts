import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import PlaceResponse from "src/domains/Place";
import ErrorHandling from "../util/ErrorHandling";

const PlaceRef = supabase.from("place");

export default class PlaceController {
  static async create(req: Request, res: Response) {
    const { body } = req;

    if (!body)
      return res.status(404).json({ status: 404, message: "Empty body" });

    const newPlace = body as PlaceResponse;

    const {
      name,
      description,
      addressId,
      openingTime,
      closingTime,
      daysOfWeek,
    } = newPlace;

    if (
      !name ||
      !description ||
      !addressId ||
      !openingTime ||
      !closingTime ||
      !daysOfWeek
    )
      return res
        .status(404)
        .json({ status: 404, message: "Please fill all the mandatory fields" });

    const placeInserted = await PlaceRef.insert(newPlace).select();

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

    if (!body)
      return res.status(404).json({ status: 404, message: "Empty body" });

    const newPlace = body as PlaceResponse;

    const {
      id,
      name,
      description,
      addressId,
      openingTime,
      closingTime,
      daysOfWeek,
    } = newPlace;

    if (
      !id ||
      !name ||
      !description ||
      !addressId ||
      !openingTime ||
      !closingTime ||
      !daysOfWeek
    )
      return res
        .status(404)
        .json({ status: 404, message: "Please fill all the mandatory fields" });

    const updatedPlace = await PlaceRef.update(newPlace, { count: "exact" }).eq(
      "id",
      newPlace.id
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
