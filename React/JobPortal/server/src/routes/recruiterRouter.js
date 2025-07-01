import express from "express";
import { Protect, isRecruiter } from "../middlewares/authMiddleware.js";

import { addJob, viewAllJob } from "../controllers/recruiterController.js";

const router = express.Router();

router.post("/addJob", Protect, isRecruiter, addJob);
router.post("/viewAllJob", Protect, isRecruiter, viewAllJob);

export default router;
