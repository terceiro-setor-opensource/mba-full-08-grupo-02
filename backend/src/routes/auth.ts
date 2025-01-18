import { Router } from "express";
import { login, refreshToken, profile } from "../controllers/LoginController";
import { authenticateJWT } from "../middlewares/auth";
import { register } from "../controllers/RegisterController";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshToken);

router.get("/profile", authenticateJWT, profile);

export default router;
