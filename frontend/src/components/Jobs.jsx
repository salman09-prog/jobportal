import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }


  }, [allJobs, searchedQuery]);

  return (
    
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        {/* Toggle Filter for Mobile */}
        <div className="md:hidden mb-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-[#6A38C2] font-medium"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar Filter */}
          {(showFilter || window.innerWidth >= 768) && (
            <div className="md:w-1/4 w-full">
              <FilterCard />
            </div>
          )}

          {/* Job Grid */}
          {filterJobs.length <= 0 ? (
            <span className="text-center">Jobs not found</span>
          ) : (
            <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.slice(0, 6).map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
