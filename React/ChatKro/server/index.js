import express from "express";
import connectDB from "./src/config/db.js";
await connectDB();
import cloudinary from "./src/config/cloudinary.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import AuthRouter from "./src/router/authRouter.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server Connected" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "Internal Server Error" });
});

const Port = process.env.PORT || 5000;

app.listen(Port, "0.0.0.0", async () => {
  console.log("Server Started at", Port);
  try {
    await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
