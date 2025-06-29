import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store.js";
import { setLoading } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  let handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }

    setInput({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: "",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center px-4">
        <form
          action="POST"
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="mb-2">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={input.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2">Phone number</Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-2">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  id="student"
                  className="cursor-pointer"
                  checked={input.role == "student"}
                  onChange={handleInputChange}
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  id="recruiter"
                  className="cursor-pointer"
                  checked={input.role == "recruiter"}
                  onChange={handleInputChange}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <label htmlFor="profile">Profile</label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                name="file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-black text-white w-full my-4 cursor-pointer hover:scale-105"
            >
              Signup
            </Button>
          )}

          <span className="text-sm flex justify-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
