import express from "express";
import { CurrentUser, GetAllUser, receiveMessage, sendMessage } from "../controller/userController.js";
import { Protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUser", Protect, GetAllUser);
router.get("/getCurrentUser/:id", Protect, CurrentUser);

router.get("/receive/:id",Protect,receiveMessage)
router.post("/send",Protect,sendMessage)

export default router;
