import { Router } from "express";
import PlaceController from "../controllers/PlaceController";

const router = Router();

router.get("/", PlaceController.findAll);
router.post("/", PlaceController.create);
router.put("/", PlaceController.update);
router.delete("/", PlaceController.delete);

export default router;
