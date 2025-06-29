import React, { useState } from "react";
import { Dialog, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import store from "@/redux/store";

const UpdateProfieDialog = ({ open, setOpen }) => {
  // const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const {loading} = useSelector((store) => store.auth);
  
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: user?.profile?.resume,
  });
  
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      // setLoading(true);
      dispatch(setLoading(true));
      const res = await axios.put(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      // setLoading(false)'
      dispatch(setLoading(false));
    }
    setOpen(false);
    console.log(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogContent
            className={"bg-white max-w-[425px]"}
            onInteractOutside={() => setOpen(false)}
          >
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type={"text"}
                    onChange={handleInputChange}
                    id="name"
                    name="fullname"
                    className={"col-span-3"}
                    value={input.fullname}
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type={"email"}
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    className={"col-span-3"}
                    value={input.email}
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    type="number"
                    onChange={handleInputChange}
                    id="number"
                    name="phoneNumber"
                    className={"col-span-3"}
                    value={input.phoneNumber}
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    type={"text"}
                    onChange={handleInputChange}
                    id="bio"
                    name="bio"
                    className={"col-span-3"}
                    value={input.bio}
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    type={"text"}
                    onChange={handleInputChange}
                    id="skills"
                    name="skills"
                    className={"col-span-3"}
                    value={input.skills}
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor="file">Resume</Label>
                  <Input
                    id="file"
                    name="file"
                    type={"file"}
                    accept="application/pdf"
                    className={"col-span-3"}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4 bg-black text-white">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-black text-white w-full my-4 cursor-pointer hover:scale-105"
                  >
                    Update
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UpdateProfieDialog;
