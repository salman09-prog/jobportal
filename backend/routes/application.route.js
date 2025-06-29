 import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

 const router = express.Router();

 router.route("/applyJob/:id").get(isAuthenticated, applyJob);
 router.route("/getAppliedJobs").get(isAuthenticated, getAppliedJobs);
 router.route("/:id/getApplicants").get(isAuthenticated, getApplicants);
 router.route("/status/:id/update").put(isAuthenticated, updateStatus);

 export default router;