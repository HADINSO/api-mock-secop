import { Request, Response } from "express";
import { readExcel } from "../services/excel.service";

export const getContracts = (req: Request, res: Response) => {
  try {
    const contracts = readExcel();

    res.json({
      total: contracts.length,
      data: contracts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error leyendo Excel",
      error,
    });
  }
};

export const getContractById = (req: Request, res: Response) => {
  try {
    const contracts = readExcel();

    const contract = contracts.find(
      (c) => c.id_contrato === req.params.id
    );

    if (!contract) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.json(contract);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};