import { Router } from "express";
import FavoritePlaceController from "../controllers/FavoritePlaceController";

const router = Router();

router.get("/", FavoritePlaceController.findAll);
router.get("/:userid", FavoritePlaceController.findById);
router.post("/", FavoritePlaceController.create);
router.put("/:id", FavoritePlaceController.update);
router.delete("/", FavoritePlaceController.delete);

export default router;
