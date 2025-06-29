import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const navLinks = user && user.role === "recruiter" ? (
    <>
      <li><Link to={"/admin/companies"}>Companies</Link></li>
      <li><Link to={"/admin/jobs"}>Jobs</Link></li>
    </>
  ) : (
    <>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/jobs"}>Jobs</Link></li>
      <li><Link to={"/browse"}>Browse</Link></li>
    </>
  );

  return (
    <div className="bg-white w-full shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6 h-16">
        <div className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Hunt</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <ul className="flex items-center gap-6 font-medium">
            {navLinks}
          </ul>

          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="text-[#6A38C2]">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile.profilePhoto} alt="user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.profile.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link" className="px-0">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button onClick={handleLogout} variant="link" className="px-0">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 shadow">
          <ul className="flex flex-col gap-4 text-base font-medium my-3">
            {navLinks}
          </ul>
          <div className="flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full text-[#6A38C2]">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] text-white hover:bg-[#5b30a6]">Signup</Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "student" && (
                  <Link to="/profile">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <User2 size={18} /> View Profile
                    </Button>
                  </Link>
                )}
                <Button onClick={handleLogout} variant="destructive" className="w-full flex items-center gap-2 text-black">
                  <LogOut size={18} /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
