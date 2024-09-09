import { Router } from "express";
import ImageController from "../controllers/ImageController";

const router = Router();

router.get("/", ImageController.findAll);
router.get("/:id", ImageController.findById);
router.post("/", ImageController.create);
router.put("/:id", ImageController.update);
router.delete("/", ImageController.delete);

export default router;
