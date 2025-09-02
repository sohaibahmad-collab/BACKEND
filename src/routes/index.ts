import { Router } from "express";
import expenseRoutes from "@src/routes/expenseRoutes.ts";

const router = Router();

router.use("/expenses", expenseRoutes);

export default router;
