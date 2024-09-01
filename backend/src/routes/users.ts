import { Router } from 'express';
import { findAll, findById, create, update } from "../controllers/UserController";


const routes = Router();

routes.post("/user", create);
routes.get("/user", findAll);
routes.get("/user/:id", findById);
routes.put("/user/:id", update);

export default routes;
