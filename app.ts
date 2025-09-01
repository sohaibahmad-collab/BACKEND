import express, { type Application } from "express";
import dotenv from "dotenv";
import expenseRoutes from "@src/routes/expenseRoutes.ts";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

export default app;
