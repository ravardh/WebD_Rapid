import express from "express";
import {
  Login,
  Register,
  Logout,
  Update,
  VerifyOTP,
  GenerateOTP,
  ChangePassword,
} from "../controllers/authController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const uploads = multer();

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/update", Protect, uploads.single("image"), Update);

router.post("/generateOTP", GenerateOTP);
router.post("/verifyOTP", VerifyOTP);
router.patch("/changePassword", ChangePassword);

export default router;
