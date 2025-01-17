import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { authenticateJWT } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateJWT, AccountController.findAll);
router.get("/:id", authenticateJWT, AccountController.findById);
router.put("/:id", authenticateJWT, AccountController.update);
router.delete("/", authenticateJWT, AccountController.delete);

export default router;
