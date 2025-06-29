import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/postJob").post(isAuthenticated, postJob);
router.route("/getAllJobs").get(isAuthenticated, getAllJobs);
router.route("/getJobById/:id").get(isAuthenticated, getJobById);
router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

export default router;