import { Router } from "express";
import FeedbackController from "../controllers/FeedbackController";

const router = Router();

router.get("/", FeedbackController.findAll);
router.get("/:id", FeedbackController.findById);
router.post("/", FeedbackController.create);
router.put("/:id", FeedbackController.update);
router.delete("/", FeedbackController.delete);

export default router;
