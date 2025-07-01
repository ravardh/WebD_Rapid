import dotenv from "dotenv";
dotenv.config();

import express from "express";
import AuthRouter from "./src/routes/authRouter.js";
import UserRouter from "./src/routes/userRouter.js";
import RecruiterRouter from "./src/routes/recruiterRouter.js";
import AdminRouter from "./src/routes/adminRouter.js";
import PublicRouter from "./src/routes/publicRouter.js";

import connectDB from "./src/config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

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
app.use("/user", UserRouter);
app.use("/recruiter", RecruiterRouter);
app.use("/admin", AdminRouter);
app.use("/public", PublicRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server!" });
});

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({ message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});
