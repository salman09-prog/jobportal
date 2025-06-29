import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfieDialog from "./UpdateProfieDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const resumeExists = true;

const Profile = () => {
  useGetAppliedJobs();

  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 px-4 py-6 sm:p-8">
        {/* Top section with avatar and info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profile.profilePhoto} />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p className="text-gray-600">{user.profile.bio}</p>
            </div>
          </div>

          {/* Edit button */}
          <div className="flex justify-center sm:justify-end">
            <Button
              variant={"outline"}
              className="cursor-pointer hover:bg-[#f1f1f1]"
              onClick={() => setOpen(true)}
            >
              <Pen size={16} />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact size={18} />
            <span>+91 {user.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.profile.skills.length <= 0 ? (
              <span>NA</span>
            ) : (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="bg-black text-white rounded-full">
                  {skill}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-5">
          <Label className="text-md font-bold block mb-1">Resume</Label>
          {resumeExists ? (
            <a
              href={user.profile.resume}
              target="_blank"
              className="text-blue-500 hover:underline break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-8 py-6">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>

      {/* Dialog */}
      <UpdateProfieDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
