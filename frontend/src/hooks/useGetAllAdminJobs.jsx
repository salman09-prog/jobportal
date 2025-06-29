import { JOB_API_ENDPOINT } from "@/components/utils/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res?.data?.adminJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
