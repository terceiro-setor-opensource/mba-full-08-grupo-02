import { Router } from "express";
import { findAll, findById, findBenefitsByActivityId } from "../controllers/ActivityController";
const routes = Router();

routes.get("/activity", findAll);
routes.get("/activity/:id", findById);
routes.get("/activity/:id/benefits", findBenefitsByActivityId);

export default routes;
