import { Request, Response } from "express";
import { readExcel } from "../services/excel.service";
import { analyzeContract } from "../services/ai.service";

const cleanJSON = (text: string) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
};

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


export const analyzeContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const contracts = readExcel();

    const contract = contracts.find(
      (c: any) => c.id_contrato === id
    );

    if (!contract) {
      return res.status(404).json({
        message: "Contrato no encontrado"
      });
    }


    const rawAnalysis = await analyzeContract(contract);

    const analysis = cleanJSON(rawAnalysis);

    res.json({
      contract,
      analysis
    });

  } catch (error) {
    res.status(500).json({
      message: "Error analizando contrato",
      error
    });
  }
};