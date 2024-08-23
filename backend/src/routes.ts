import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { findAll, findById, findBenefitsByActivityId } from "./controllers/ActivityController";
const routes = Router();

routes.post("/user", new UserController().create);
routes.get("/user", new UserController().findAll);

routes.get("/activity", findAll);
routes.get("/activity/:id", findById);
routes.get("/activity/:id/benefits", findBenefitsByActivityId);

export default routes;
