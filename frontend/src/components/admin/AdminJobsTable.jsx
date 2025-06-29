import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchAdminJobByText } = useSelector((state) => state.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchAdminJobByText) return true;
        return job?.title?.toLowerCase().includes(searchAdminJobByText.toLowerCase());
      });
    setFilterJob(filteredJob);
  }, [allAdminJobs, searchAdminJobByText]);

  return (
    <div className="w-full">
      {/* ✅ TABLE on md+ screens */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
        <Table className="min-w-[600px]">
          <TableCaption>A list of your recent posted jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJob?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ CARDS on small screens */}
      <div className="md:hidden space-y-4 mt-4">
        {filterJob?.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{job?.title}</h2>
                <p className="text-sm text-gray-600">{job?.company?.name}</p>
              </div>
              <span className="text-xs text-gray-500">
                {job?.createdAt?.split("T")[0]}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <button
                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                className="text-green-600 underline hover:text-green-800"
              >
                View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminJobsTable;
