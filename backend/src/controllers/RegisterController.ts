import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Invalid phone number format").optional(),
  account_type_id: z.number().int().positive("Invalid account type ID").default(2),
});

export async function register(req: Request, res: Response): Promise<Response> {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { email, password, name, phone_number, account_type_id } = validation.data;

  const { data: existingAccount } = await supabase
    .from("account")
    .select("email")
    .eq("email", email)
    .single();

  if (existingAccount) {
    return res.status(409).json({ message: "Account already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("account")
    .insert([
      { email, password: hashedPassword, name, phone_number, account_type_id },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ message: "Account registered successfully", data });
}
