import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async (req, res) => {
    const jobId = req.params.id;
    console.log(jobId);
    
    const userId = req.id;

    if (!jobId) {
        return res.status(400).json({
            message: "Job id is required",
            success: false
        })
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
        return res.status(400).json({
            message: "You cannot apply for same job",
            success: false
        })
    }

    const job = await Job.findById(jobId);
    console.log(job);
    if (!job) {
        return res.status(400).json({
            message: "Job not found",
            success: false
        })
    }



    const application = await Application.create({
        job: jobId,
        applicant: userId
    });

    job.applications.push(application._id);
    console.log(job);

    await job.save();

    return res.status(201).json({
        message: "Your application is sent!",
        success: true
    })
};

export const getAppliedJobs = async (req, res) => {

    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        })
        if (!applications) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            })
        }

        return res.status(201).json({
            applications,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//For admin to check how many ppl have applied for the job

export const getApplicants = async (req, res) => {

    try {
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } }
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(201).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }


};

//Update status

export const updateStatus = async (req, res) => {

    try {
        const applicationId = req.params.id;
        const { status } = req.body;        

        if (!status) {
            return res.status(404).json({
                message: "Status not found",
                success: false
            })
        }     

        const application = await Application.findByIdAndUpdate(applicationId, {status},{new: true}); 
           if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Status updated!",
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }


}
