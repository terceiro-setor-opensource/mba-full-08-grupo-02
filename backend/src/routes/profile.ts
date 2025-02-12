import { Router } from "express";
import ProfileController from "../controllers/ProfileController";

const router = Router();
router.put("/", ProfileController.updateProfile);

export default router;
