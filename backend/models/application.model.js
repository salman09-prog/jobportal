// This schema is for applicants those who will apply for jobs, like who applied and in which company he/she applied.

import mongoose, { mongo } from "mongoose"

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending","accepted", "rejected"],
        default: "pending"
    }
},{timestamps: true});

export const Application = mongoose.model("Application", applicationSchema);
