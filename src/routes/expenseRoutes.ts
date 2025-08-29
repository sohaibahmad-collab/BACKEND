import { Router } from "express";
import {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.ts";

const router: Router = Router();

router.get("/", getExpenses);

router.post("/", createExpense);

router.get("/:id", getExpenseById);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
