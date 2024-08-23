import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import { ActivityResponse } from "../domains/Activity";

const ActivityTable = supabase.from<'activity', ActivityResponse[]>("activity");

export async function findAll(req: Request, res: Response): Promise<Response> {
    const { data, error } = await ActivityTable.select("id, name, description");
    if(error) {
      return res.status(500).json({ error: error.message });
    }

    if(data.length === 0) {
      return res.status(204).json({
        message: "No activities found"
      });
    }

    return res.json(data);
}

export async function findById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const { data, error } = await ActivityTable.select("id, name, description").eq("id", id);
  if(error) {
    return res.status(500).json({ error: error.message });
  }

  if(data.length === 0) {
    return res.status(404).json({
      message: "Activity not found"
    });
  }

  return res.json(data[0]);
}

export async function findBenefitsByActivityId(req: Request, res: Response) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("activity_benefit")
    .select(`
      benefit_id,
      benefit (
        name,
        description
      )
    `)
    .eq("activity_id", id);

    if(error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data || []);
}
