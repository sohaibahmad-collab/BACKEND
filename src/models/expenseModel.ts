import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  name: string;
  amount: number;
}

const expenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
