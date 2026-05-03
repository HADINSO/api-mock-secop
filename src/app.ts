import express from "express";
import cors from "cors";
import contractsRoutes from "./routes/contracts.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contracts", contractsRoutes);

export default app;