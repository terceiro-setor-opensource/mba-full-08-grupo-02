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
router.get("/:id/details", PlaceController.findPlaceDetails);
router.post("/", PlaceController.create);
router.put("/:id", PlaceController.update);
router.delete("/", PlaceController.delete);
router.get("/:id/benefits", PlaceController.findBenefitsByPlaceId);
router.get("/user-location/places", PlaceController.getByUserLocation);
router.get("/user-favorite/places", PlaceController.getByUserFavorite);

export default router;
