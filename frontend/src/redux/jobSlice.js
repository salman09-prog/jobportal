import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchAdminJobByText: null,
        allAppliedJobs: [],
        searchedQuery: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchAdminJobByText: (state, action) => {
            state.searchAdminJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchAdminJobByText, setAllAppliedJobs , setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;