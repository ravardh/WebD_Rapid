import express from "express";
import {
  GetAllJObs,
  submitContactForm,
} from "../controllers/publicController.js";

const router = express.Router();

router.get("/allJobs", GetAllJObs);
router.post("/submitContactForm", submitContactForm); 

export default router;
