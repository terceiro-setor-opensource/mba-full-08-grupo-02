import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export async function findAll(req: Request, res: Response): Promise<Response> {
    const { data, error } = await supabase.from('users').select("*");
    if(error) {
      return res.status(500).json({ error: error.message });
    }

    if(data.length === 0) {
      return res.status(204).json({
        message: "No users found"
      });
    }

    return res.json(data);
}

export async function findById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const { data, error } = await supabase.from('users').select("id, name, birthdate").eq("id", id).limit(1).single();
  
  if(error) {
    return res.status(500).json({ error: error.message });
  }

  if(data.length === 0) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.json(data[0]);
}

export async function create(req: Request, res: Response): Promise<Response> {

    const { data, error } = await supabase.from('users').insert([
        { name: req.body.name,
          birthdate: req.body.birthdate
         }]).select();


    if(error) {
      return res.status(500).json({ error: error.message });
    }

    if(!data){
        res.status(400).json({ error: 400, message: error})
    }

    return res.status(201).json({ status: 201, message: data})

  }

  export async function update(req: Request, res: Response){

        try{

        const retorno = await supabase.from('users')
            .update(
                {'name': req.body.name,
                 'birthdate': req.body.birthdate})
            .eq('id', req.params.id).select()

            if(!retorno){
                return res.status(404).json({ message: "User not found" });
            }
        
            return res.status(201).json({ status: 201, message: retorno.data})

        }catch(error){
            res.status(500).json({error});
        }


  }