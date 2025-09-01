import connectDB from "@src/config/db.ts";
import express, { type Application } from "express";
import dotenv from "dotenv";
import expenseRoutes from "@src/routes/expenseRoutes.ts";
import errorMiddleware from "./src/middlewares/errorMiddleware";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.use(errorMiddleware)

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
