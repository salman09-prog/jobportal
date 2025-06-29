import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  let navigate = useNavigate();

  let dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  let handleInputChange = (e) => {
    // setFormData((currData) => {
    //     currData[fieldName] = newVal;
    //     return {...currData};
    // })

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      let res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }

    setInput({
      email: "",
      password: "",
      role: "",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center px-4">
        <form
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold mb-5">Login</h1>
          <div className="my-2">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="my-2">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={handleInputChange}
              name="password"
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
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-black text-white w-full my-4 cursor-pointer hover:scale-105"
            >
              Login
            </Button>
          )}

          <span className="text-sm flex justify-center">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
