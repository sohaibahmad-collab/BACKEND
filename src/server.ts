import app from "../app.ts";
import connectDB from "../src/config/db.ts";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
