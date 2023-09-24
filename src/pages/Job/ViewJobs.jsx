import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { BiRefresh } from "react-icons/bi";
import { AiOutlineOrderedList, AiOutlineStar } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jobSlice from "../../features/job/job-slice";

function ViewJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alljobs, setalljobs] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  const getAllJobs = async () => {
    axios
      .get(process.env.REACT_APP_BACKEND + "getAllJobs")
      .then((res) => {
        // console.log(res.data.alljobs[0]);
        // setalljobs(res.data.alljobs?.reverse());
        console.log(res.data.result);
        //   setalljobs(res.data.alljobs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const effectRan = useRef(false);
  useEffect(() => {
    document.title = "View Jobs | hAIr";
    if (!effectRan.current) {
      console.log("getting all jobs");
      axios
        .get(process.env.REACT_APP_BACKEND + "getAllJobs")
        .then((res) => {
          // console.log(res.data.alljobs[0]);
          // setalljobs(res.data.alljobs?.reverse());
          console.log(res.data.result);
          setalljobs(res.data.result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => (effectRan.current = true);
  }, []);

  const setJob = async (job) => {
    dispatch(
      jobSlice.actions.setJob({
        id: job.JobId,
        title: job.JobTitle,
        description: job.clean_data,
      })
    );

    navigate("/viewJob/" + job.JobId);
  };

  return (
    <div className="flex flex-col w-full h-full mt-4 gap-4 bg-transparent">
      {/* <h1>All Jobs</h1> */}
      <form className="flex text-black h-16 items-center w-full gap-4 px-4 sticky top-16">
        <input
          type="text"
          placeholder="Search by Job Title or Job ID"
          value={searchQuery}
          className="border-2 border-gray-300 rounded-md p-2 flex-grow"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        {/* <button onClick={SendSearch}>
          <AiOutlineSearch />
        </button> */}
        <button
          onClick={getAllJobs}
          className="bg-prim rounded-full p-1 text-xl text-gray-900"
        >
          <BiRefresh />
        </button>
      </form>
      {alljobs
        ?.filter((val) => {
          if (searchQuery == "") {
            return val;
          } else if (
            val.JobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            val.JobId.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return val;
          }
        })
        .map((job) => (
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between w-full border-2 border-prim p-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-4 items-center w-3/4">
              <div className="text-white font-bold text-lg">{job.JobId}</div>
              <div className="text-prim text-lg">{job.JobTitle}</div>
              <div className="text-gray-500">
                {job.clean_data?.slice(0, 100) + "..."}
              </div>
            </div>
           
             
              <button
                className="bg-prim text-gray-900 rounded-md px-3 py-2 flex items-center gap-2"
                // to={`/viewJob/${job.JobId}`}
                onClick={() => setJob(job)}
              >
                <AiOutlineOrderedList className="h-5 w-5 " /> Rank Candidates
              </button>
            
          </div>
        ))}
      {alljobs?.length == 0 && (
        <div className="mx-auto flex flex-col items-center gap-4">
          <div className="text-4xl font-medium text-prim">No Jobs Found</div>
          <img
            src="https://cdn.dribbble.com/users/1208688/screenshots/4563859/no-found.gif"
            className="max-w-xl"
          />
        </div>
      )}
    </div>
  );
}

export default ViewJobs;
