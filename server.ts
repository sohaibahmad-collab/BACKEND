import connectDB from "@src/config/db.ts";
import express, { type Application } from "express";
import routes from "@src/routes";
import { settings } from "@src/config/settings";
import errorMiddleware from "@src/middlewares/errorMiddleware";

const app: Application = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = settings.port || 1000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
