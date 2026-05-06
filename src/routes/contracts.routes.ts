import { Router } from "express";
import {
  getContracts,
  getContractById,
  analyzeContractById
} from "../controllers/contracts.controller";

const router = Router();

router.get("/", getContracts);
router.get("/:id", getContractById);
router.get("/analyze/:id", analyzeContractById);


export default router;