import { supabase } from "src/services/supabase";
import ErrorHandling from "src/util/ErrorHandling";
import { z } from "zod";

const ImageRef = supabase.from("image");

const insertBodySchema = z.object({
    url: z.string().min(1),
});

export default class ImageController {
    static async findAll(req: Request, res: Response) {
        const { data, error } = await ImageRef.select("*");

        if(error) {
            return res.status(500).json({ error: error.message });
        }

        if(data.length === 0) {
            return res.status(204).json({
            message: "No image found"
            });
        }

        res.status(201).json(data);
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;
        const { data, error } = await ImageRef.select("*").eq("id", id);

        if(error) {
            return res.status(500).json({ error: error.message });
        }

        if(data.length === 0) {
            return res.status(204).json({
                message: `No place found for the id = ${id}`
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

        const insertedImage = await ImageRef.insert(body).select();

        const { error } = insertedImage;
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

        const validation = insertBodySchema.safeParse(body);
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
                "removing Place"
              ).returnObjectRequestError()
            );
    
        res
          .status(201)
          .json({ code: 201, status: "OK", message: `Rows affected -> ${count}` });
    }
}