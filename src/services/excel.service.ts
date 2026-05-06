import * as XLSX from "xlsx";
import path from "path";

export type Contract = Record<string, any>;

export const readExcel = (): Contract[] => {
  const filePath = path.join(__dirname, "../data/CDA.xlsx");

  const workbook = XLSX.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
    defval: "", // evita undefined
  });

  return data;
};