import { Job } from "../models/job.model.js";

//Admin will post job
export const postJob = async (req, res) => {

    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            createdBy: userId
        })

        return res.status(200).json({
            message: "New job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }

}

//For students
export const getAllJobs = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

//Get jobs by id - for students

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

//Finding no. of jobs created by admin

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const adminJobs = await Job.find({ createdBy: adminId }).populate({
            path: "company"
        });;

        if (!adminJobs) {
            return res.status(404).json({
                message: "No Jobs created by admin",
                success: false
            })
        }

        return res.status(201).json({
            adminJobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}