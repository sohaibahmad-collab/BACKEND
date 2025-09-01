import { NextFunction, type Request, type Response } from "express";
import Expense from "@src/models/expenseModel.ts";
import { HttpStatusCode } from "@src/utils/httpStatus.ts";
import { HttpMessage } from "@src/utils/httpMessage.ts";
import ApiError from "@src/utils/apiError";

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expenses = await Expense.find({});
    res.status(HttpStatusCode.OK).json(expenses);
  } catch (error: Error) {
    next(error);
  }
};

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, amount } = req.body;
    const expense = await Expense.create({ name, amount });
    res.status(HttpStatusCode.CREATED).json(expense);
  } catch (error: Error) {
    next(error);
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return next(
        new ApiError(HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND)
      );
    }
    res.status(HttpStatusCode.OK).json(expense);
  } catch (error: Error) {
    next(error);
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return next(
        new ApiError(HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND)
      );
    }
    res.status(HttpStatusCode.CREATED).json(expense);
  } catch (error: Error) {
    next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return next(
        new ApiError(HttpStatusCode.NOT_FOUND, HttpMessage.NOT_FOUND)
      );
    }
    res
      .status(HttpStatusCode.OK)
      .json({ message: HttpMessage.DELETED });
  } catch (error: Error) {
    next(error);
  }
};
