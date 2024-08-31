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

  const { data, error } = await supabase.from('users').select("id, name, birthdate").eq("id", id);
  
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

// export class UserController {

//     const ActivityTable = supabase.from<'activity', ActivityResponse[]>("activity");


//     async findAll( request: Request, response: Response){

//         const retorno = await supabase
//         .from('users')
//         .select('*')

//         if(!retorno.data){
//             response.status(404).json({ status: 404, message: "User Not Found!"})
//         }
//         response.status(200).json(retorno.data)

//     }

//     async findById( request: Request, response: Response){

//         const retorno = await supabase
//         .from('users')
//         .select('*')
//         .eq('id', request.params.id)

//         if(!retorno.data){
//             response.status(404).json({ status: 404, message: "User Not Found!"})
//         }
//         response.status(200).json(retorno.data)

//     }

//     async create(request: Request, response: Response ){

//         const { data, error } = await supabase
//             .from('users')
//             .insert([
//                 { name: request.body.name },
//             ])
//             .select()

//         if(!data){
//             response.status(400).json({ error: 400, message: error})
//         }

//         response.status(201).json({ status: 201, message: data})

//     }

//     async update( request: Request, response: Response){

//         try{

//             const { name, birthdate } = request.body;


//             const retorno = await supabase
//             .from('users')
//             .update(
//                 {'name': name,
//                  'birthdate': birthdate
//                 }
//             )
//             .eq('id', request.params.id)

//             if(!retorno){
//                 return response.status(404).json({ message: "User not found" });
//             }

//         }catch(error){
//             response.status(500).json({error});
//         }


//         // const retorno = await supabase
//         // .from('users')
//         // .select('*')
//         // .eq('id', request.body.id)

//         // if(!retorno.data){
//         //     response.status(404).json({ status: 404, message: "User Not Found!"})
//         // }
//         // response.status(200).json(retorno.data)

//     }

// }
// export default new UserController();
