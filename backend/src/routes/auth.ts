import { Router } from "express";
import { login, refreshToken } from "../controllers/LoginController";
import { authenticateJWT } from "../middlewares/auth";
import { register } from "../controllers/RegisterController";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshToken);

router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: (req as any).user });
});

export default router;

