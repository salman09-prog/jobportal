import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "./utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/applyJob/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getJobById/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return (
      <div className="text-center mt-10 font-medium text-gray-600">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Top Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{singleJob.title}</h1>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="text-blue-700 font-bold rounded-full" variant="ghost">
              {singleJob.position} Positions
            </Badge>

            <Badge className="text-[#F83002] font-bold rounded-full" variant="ghost">
              {singleJob.jobType}
            </Badge>

            <Badge className="text-[#7209b7] font-bold rounded-full" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg w-full md:w-auto ${
            isApplied
              ? "bg-gray-900 cursor-not-allowed text-white"
              : "bg-[#7209b7] hover:bg-[#5f32ad] text-white cursor-pointer"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Description Section */}
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-10">
        Job Description
      </h1>

      <div className="mt-6 space-y-4 text-base text-gray-800">
        <p>
          <strong>Role:</strong>{" "}
          <span className="pl-2 font-normal">{singleJob.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="pl-2 font-normal">{singleJob.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="pl-2 font-normal">{singleJob.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="pl-2 font-normal">
            {singleJob.experienceLevel} yrs
          </span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="pl-2 font-normal">{singleJob.salary} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="pl-2 font-normal">
            {singleJob.applications?.length || 0}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="pl-2 font-normal">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
