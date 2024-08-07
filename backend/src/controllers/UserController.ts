import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
  }

  async findAll(req: Request, res: Response) {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("id", "0b99df80-6065-498a-bc6c-bcc19e053d2d")
      .returns<UserResponse>()
      .single();

    return data;
  }
}
export default new UserController();
