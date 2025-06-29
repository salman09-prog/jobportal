import { COMPANY_API_ENDPOINT } from "@/components/utils/constant";
import { setAllCompanies } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);

        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
