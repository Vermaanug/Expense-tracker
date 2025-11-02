import "dotenv/config";
import cors from "cors";
import express from "express";
import ConnectDB from "./db/ConnectDb.js";
import transcationRouter from "./route/transcation.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/transcation", transcationRouter);

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
