import express from "express";
import multer from "multer";
import {
  Register,
  Login,
  Logout,
  Update,
  Delete,
  googleLogin,
} from "../controller/authController.js";

const router = express.Router();

const upload = multer();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/googleLogin",googleLogin)
router.put("/update", upload.single("profilePic"), Update);
router.delete("/delete", Delete);

export default router;
