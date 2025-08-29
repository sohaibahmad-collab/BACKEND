import { type Request, type Response } from "express";
import Expense from "../models/expenseModel.ts";

export const getExpenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, amount } = req.body;
    const expense = await Expense.create({ name, amount });
    res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
