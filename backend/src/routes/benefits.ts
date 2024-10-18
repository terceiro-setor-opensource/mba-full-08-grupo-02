import { Router } from "express";
import BenefitsController from "../controllers/BenefitsController";

const router = Router();

router.get("/", BenefitsController.findAll);
router.get("/:id", BenefitsController.findById);
router.post("/", BenefitsController.create);
router.put("/:id", BenefitsController.update);
router.delete("/", BenefitsController.delete);

export default router;
