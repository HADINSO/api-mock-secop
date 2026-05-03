import { Router } from "express";
import {
  getContracts,
  getContractById,
  getAlerts
} from "../controllers/contracts.controller";

const router = Router();

router.get("/", getContracts);
router.get("/alerts", getAlerts);
router.get("/:id", getContractById);

export default router;