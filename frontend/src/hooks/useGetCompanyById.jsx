import { COMPANY_API_ENDPOINT } from "@/components/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useGetCompanyById = (companyId) => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
