import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { supabase } from "../services/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function login(req: Request, res: Response): Promise<Response> {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { email, password } = validation.data;

  const { data: account, error } = await supabase
    .from("account")
    .select("id, email, password, account_type_id, name, phone_number")
    .eq("email", email)
    .single();

  if (error || !account) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValidPassword = await bcrypt.compare(password, account.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const { data: cadastro } = await supabase
    .from("users")
    .select("id")
    .eq("accountid", account.id)
    .single();

    if (!cadastro) {
      return res.status(401).json({ message: "User not found" });
    }

  const token = jwt.sign(
    {
      id: account.id,
      email: account.email,
      userid: cadastro.id,
      account_type_id: account.account_type_id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  return res.status(200).json({
    token,
    user: {
      id: account.id,
      name: account.name,
      email: account.email,
      phone_number: account.phone_number,
      account_type_id: account.account_type_id,
    },
  });
}

export async function refreshToken(
  req: Request,
  res: Response
): Promise<Response> {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      account_type_id: number;
    };

    const newToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        account_type_id: decoded.account_type_id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return res.status(200).json({ token: newToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export async function profile(req: Request, res: Response): Promise<Response> {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

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
      return res.status(401).json({ message: "Invalid token" });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("name, birthdate, profile_image, address(*), accountid")
      .eq("accountid", decoded.id)
      .single();
    
    return res.status(200).json({
      id: account.id,
      name: account.name,
      email: account.email,
      phone_number: account.phone_number,
      account_type_id: account.account_type_id,
      birthdate: user?.birthdate,
      profile_image: user?.profile_image,
      address: user?.address,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
