import { Request, Response } from 'express';
import { supabase } from "../services/supabase"

export class UserController {

    async findAll( request: Request, response: Response){

        const retorno = await supabase
        .from('users')
        .select('*')

        if(!retorno.data){
            response.status(404).json({ status: 404, message: "User Not Found!"})
        }
        response.status(200).json(retorno.data)

    }


    async create(request: Request, response: Response ){

        const { data, error } = await supabase
            .from('users')
            .insert([
                { name: request.body.name },
            ])
            .select()

        if(!data){
            response.status(404).json({ error: 400, message: error})
        }

        response.status(201).json({ status: 201, message: data})

    }

}
export default new UserController();
