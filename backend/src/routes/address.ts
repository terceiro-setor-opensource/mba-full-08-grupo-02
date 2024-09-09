import { Router } from "express";
import AddressController from "../controllers/AddressController";

const router = Router();

router.get("/", AddressController.findAll);
router.get("/:id", AddressController.findById);
router.post("/", AddressController.create);
router.put("/:id", AddressController.update);
router.delete("/", AddressController.delete);

export default router;
