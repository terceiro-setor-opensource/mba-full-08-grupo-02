import { Router } from "express";
import PlaceController from "../controllers/PlaceController";
import PlaceSelectFilter from "../controllers/PlaceController";

const router = Router();

router.get(
  `/${Object.keys(PlaceSelectFilter)
    .map((key: string) => `:${key}?`)
    .join("/")}`,
  PlaceController.findAll
);
router.get("/:id", PlaceController.findById);
router.post("/", PlaceController.create);
router.put("/:id", PlaceController.update);
router.delete("/", PlaceController.delete);

export default router;
