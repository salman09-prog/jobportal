import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobSlice";
import store from "@/redux/store";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // const url = searchedQuery
        // ? `${JOB_API_ENDPOINT}/getAllJobs?keyword=${searchedQuery}`
        // : `${JOB_API_ENDPOINT}/getAllJobs`;

        if (searchedQuery) {
          const url = `${JOB_API_ENDPOINT}/getAllJobs?keyword=${searchedQuery}`;
          const res = await axios.get(url, {
            withCredentials: true,
          });

          console.log(res.data);

          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
          }
        } else {
          const url = `${JOB_API_ENDPOINT}/getAllJobs`;
          const res = await axios.get(url, {
            withCredentials: true,
          });

          console.log(res.data);

          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
