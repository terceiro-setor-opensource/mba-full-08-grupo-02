import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { supabase } from "../services/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

// Define Profile Update Schema
const profileSchema = z.object({
  profileimage: z.string().optional(),
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  birthdate: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.object({
    streetname: z.string().min(2, "Endereço é obrigatório"),
    addressnumber: z.string().min(1, "Número é obrigatório"),
    reference: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    neighborhood: z.string().min(2, "Bairro é obrigatório"),
    city: z.string().min(2, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),
    postalcode: z.string().min(8, "CEP é obrigatório"),
  }),
});

export default class ProfileController {
  /**
   * Updates a user's profile information and linked address.
   */
  static async updateProfile(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const { body } = req;
    const validation = profileSchema.safeParse(body);
    // Validate the request body with Zod
    if (!validation.success) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        errors: validation.error.errors,
      });
    }
    const { address, ...userData } = body;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        account_type_id: number;
      };

      const { data: account, error } = await supabase
        .from("account")
        .select("id, email, account_type_id, name, phone_number")
        .eq("id", decoded.id)
        .single();

      if (error || !account) {
        return res.status(401).json({ message: decoded.id });
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select(
          "id,name, birthdate, profile_image, addressid, address(*), accountid"
        )
        .eq("accountid", decoded.id.toString())
        .single();

      if (userError) {
        return res.status(401).json({ message: userError.message });
      }

      const addressId = user.addressid;

      // Update user profile details in "users" table
      const { error: userUpdateError } = await supabase
        .from("users")
        .update({
          profile_image: userData.profileImage ?? null,
          name: userData.name,
          birthdate: userData.birthdate
        })
        .eq("id", user.id);

      if (userUpdateError) throw userUpdateError;

      const { error: accountUpdateError } = await supabase
      .from("account")
      .update({
        name: userData.name,
        phone_number: userData.phone_number,
        email: userData.email
      })
      .eq("id", decoded.id);

    if (accountUpdateError) throw userUpdateError;

      // Update address details in "address" table
      if (addressId === null) {
        const { data: newAddress, error: newAddressError } = await supabase
          .from("address")
          .insert({
            streetname: address.streetname,
            addressnumber: address.addressnumber,
            reference: address.reference,
            latitude: address.latitude !== '' ? address.latitude : null,
            longitude: address.longitude !== '' ? address.longitude : null,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            postalcode: address.postalcode,
          })
          .select("*")
          .single();

        if (newAddressError) throw newAddressError;

        if(!newAddress) {
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: "An unexpected error occurred",
          });
        }

        const { error: addressUpdateError } = await supabase
          .from("users")
          .update({
            addressid: newAddress?.id,
          })
          .eq("id", user.id);

        if (addressUpdateError) throw addressUpdateError;

        return res.status(200).json({
          status: 200,
          message: "Profile updated successfully",
        });
      } else {
        const { error: addressUpdateError } = await supabase
          .from("address")
          .update({
            streetname: address.streetname,
            addressnumber: address.addressnumber,
            reference: address.reference,
            latitude: address.latitude !== '' ? address.latitude : null,
            longitude: address.longitude !== '' ? address.longitude : null,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            postalcode: address.postalcode,
          })
          .eq("id", addressId);

        if (addressUpdateError) throw addressUpdateError;

        return res.status(200).json({
          status: 200,
          message: "Profile updated successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message || "An unexpected error occurred",
      });
    }
  }
}
