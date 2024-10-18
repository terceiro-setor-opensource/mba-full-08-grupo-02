import { Router } from "express";
import AccountTypeController from "../controllers/AccountTypeController";

const router = Router();

router.get("/", AccountTypeController.findAll);
router.get("/:id", AccountTypeController.findById);
router.post("/", AccountTypeController.create);
router.put("/:id", AccountTypeController.update);
router.delete("/", AccountTypeController.delete);

export default router;
