import { NextFunction, type Request, type Response } from "express";
import Expense from "@src/models/expenseModel.ts";
import ApiError from "@src/utils/ApiError.ts";

export const getExpenses = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error: any) {
    next(error)
  }
};

export const createExpense = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  try {
    const { name, amount } = req.body;
    const expense = await Expense.create({ name, amount });
    res.status(201).json(expense);
  } catch (error) {
   next(error)
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return next(new ApiError(404, "Expense not found"));
    }
    res.status(200).json(expense);
  } catch (error: any) {
    next(error)
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
        return next(new ApiError(404, "Expense not found"));
    }
    res.status(200).json(expense);
  } catch (error: any) {
    error(next)
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return next(new ApiError(404, "Expense not found"));
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    next(error)
  }
};
