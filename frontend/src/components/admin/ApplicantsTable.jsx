import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div className="w-full">
      {/* TABLE VIEW */}
      <div className="hidden md:block border rounded-lg overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableCaption>A list of recently applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  <a
                    href={item?.applicant?.profile?.resume}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                </TableCell>
                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className={"bg-white"}>
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CARDS VIEW */}
      <div className="md:hidden space-y-4">
        {applicants?.applications?.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow border space-y-2"
          >
            <div>
              <p className="font-semibold">{item?.applicant?.fullname}</p>
              <p className="text-sm text-gray-600">{item?.applicant?.email}</p>
              <p className="text-sm">+91 {item?.applicant?.phoneNumber}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Resume: </span>
              <a
                href={item?.applicant?.profile?.resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                {item?.applicant?.profile?.resumeOriginalName}
              </a>
            </div>
            <div className="text-sm text-gray-500">
              Applied on: {item?.createdAt?.split("T")[0]}
            </div>
            <div className="flex gap-2">
              {shortListingStatus.map((status) => (
                <button
                  key={status}
                  onClick={() => statusHandler(status, item?._id)}
                  className={`text-xs px-3 py-1 rounded-full border hover:bg-gray-100 ${
                    status === "Accepted"
                      ? "border-green-600 text-green-700"
                      : "border-red-600 text-red-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
