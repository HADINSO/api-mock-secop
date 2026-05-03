import { Request, Response } from "express";
import contractsData from "../data/contracts.json";
import { Contract } from "../interfaces/contract.interface";

// Tipar los datos
const contracts: Contract[] = contractsData;

// Obtener todos
export const getContracts = (req: Request, res: Response) => {
  res.json(contracts);
};

// Obtener por ID
export const getContractById = (req: Request, res: Response) => {
  const contract = contracts.find((c: Contract) => c.id === req.params.id);

  if (!contract) {
    return res.status(404).json({ message: "Contrato no encontrado" });
  }

  res.json(contract);
};

// Alertas (IA simulada)
export const getAlerts = (req: Request, res: Response) => {
  const alerts = contracts.map((contract: Contract) => {
    let risk = "LOW";
    let reasons: string[] = [];

    if (contract.proponents === 1) {
      risk = "MEDIUM";
      reasons.push("Único proponente");
    }

    if (contract.value > 800000000) {
      risk = "HIGH";
      reasons.push("Posible sobrecosto");
    }

    if (!contract.experience_match) {
      risk = "HIGH";
      reasons.push("Experiencia no relacionada");
    }

    return {
      id: contract.id,
      risk,
      reasons
    };
  });

  res.json(alerts);
};