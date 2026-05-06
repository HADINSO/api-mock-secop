import { Router } from "express";
import {
  getContracts,
  getContractById
} from "../controllers/contracts.controller";

const router = Router();

router.get("/", getContracts);
router.get("/:id", getContractById);

export default router;