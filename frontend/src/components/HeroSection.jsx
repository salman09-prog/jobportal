import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector((store) => store.job);
  const [query, setQuery] = useState("");

  const handleSearchJob = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-10 sm:px-6 md:px-10 lg:px-20">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply &<br className="hidden sm:block" /> Get your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, unde.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 mt-4">
          <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[50%] border border-gray-200 rounded-full shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="w-full px-4 py-2 text-sm sm:text-base outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={handleSearchJob}
              className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-black"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
