import express from "express";
import { CurrentUser, GetAllUser } from "../controller/userController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUser", Protect, GetAllUser);
router.get("/getCurrentUser/:id", Protect, CurrentUser);

export default router;
