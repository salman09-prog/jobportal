import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <>
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allAppliedJobs.length <= 0 ? (
                <tr>
                  <TableCell colSpan={4}>You haven't applied to any job yet</TableCell>
                </tr>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob._id}>
                    <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedJob?.job?.title}</TableCell>
                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={`${
                          appliedJob?.status === "rejected"
                            ? "bg-red-400"
                            : appliedJob?.status === "pending"
                            ? "bg-gray-400"
                            : "bg-green-400"
                        }`}
                      >
                        {appliedJob.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="block sm:hidden space-y-4">
          {allAppliedJobs.length <= 0 ? (
            <div className="text-gray-600">You haven't applied to any job yet.</div>
          ) : (
            allAppliedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow rounded-md p-4 space-y-2 border"
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Date:</span>
                  <span>{job?.createdAt.split("T")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Role:</span>
                  <span>{job?.job?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Company:</span>
                  <span>{job?.job?.company?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <Badge
                    className={`${
                      job?.status === "rejected"
                        ? "bg-red-400"
                        : job?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {job.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AppliedJobsTable;
