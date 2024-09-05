import { Router } from "express";
import ImageController from "src/controllers/ImageController";

const router = Router();

router.get("/", ImageController.findAll);
router.post("/", ImageController.create);
router.put("/", ImageController.update);
router.delete("/", ImageController.delete);

export default router;
