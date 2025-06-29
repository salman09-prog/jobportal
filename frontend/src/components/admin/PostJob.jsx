import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { allCompanies } = useSelector((store) => store.company);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/postJob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Job posting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl w-full mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Post New Job</h1>
        <form
          onSubmit={handleSubmit}
          className="border border-gray-200 p-6 shadow-md rounded-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                name="salary"
                type="number"
                value={input.salary}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label>No of Positions</Label>
              <Input
                name="position"
                type="number"
                value={input.position}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Company</Label>
              {allCompanies.length > 0 ? (
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      {allCompanies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 mt-2 font-semibold">
                  Please register a company first.
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Please wait...
            </Button>
          ) : (
            <Button className="w-full mt-6">Post New Job</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
