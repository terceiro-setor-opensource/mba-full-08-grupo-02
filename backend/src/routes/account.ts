import { Router } from "express";
import AccountController from "../controllers/AccountController";

const router = Router();

router.get("/", AccountController.findAll);
router.get("/:id", AccountController.findById);
router.post("/", AccountController.create);
router.put("/:id", AccountController.update);
router.delete("/", AccountController.delete);

export default router;
