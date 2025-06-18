import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./src/routes/authRouter.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
