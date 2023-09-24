import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import candidateSlice from "../../features/candidate/candidate-slice";
import { useNavigate } from "react-router-dom";

function ViewCandidates() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allCandidates, setallCandidates] = useState([]);

  const candidateDetails = useSelector((state) => state.candidate.details);

  const effectRan = useRef(false);
  useEffect(() => {
    document.title = "View Candidates";
    if (!effectRan.current) {
      console.log("getting all candidates");
      axios
        .get(process.env.REACT_APP_BACKEND + "allCandidates")
        .then((res) => {
          console.log(res.data);
          setallCandidates(res.data.reverse());
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => (effectRan.current = true);
  }, []);

  const setCandidate = async (candidateDetails) => {
    dispatch(
      candidateSlice.actions.setCandidate({
        details: candidateDetails,
      })
    );

    navigate("/viewCandidate/" + candidateDetails.unique_id);
  };
  return (
    <div className="flex flex-col w-full h-full mt-4 gap-4 bg-transparent text-gray-50">
      {allCandidates.map((c) => (
        <div className="flex items-center justify-between w-full border-2 border-prim p-4 rounded-md">
          <div className="flex gap-4 items-center flex-grow">
            <div className="font-bold text-lg">
              Email: <span className="font-normal">{c.emails[0]}</span>
            </div>
            <div className="font-bold text-lg">
              Job ID Applied:{" "}
              <span className="font-normal text-prim ">{c.jobId}</span>
            </div>
            <div className="font-bold text-lg">
              Resume Score:{" "}
              <span className="font-normal text-prim ">{c.score}</span>
            </div>
            {c.videoAnalysis && <div className="font-bold text-lg">
              First Round Interview:{" "}
              <span className="font-medium text-green-500 ">Done</span>
            </div>}

          </div>
          <button
            className="bg-prim text-gray-900 rounded-md px-3 py-2"
            // to={`/viewJob/${job.JobId}`}
            onClick={() => setCandidate(c)}
          >
            View Candidate
          </button>
        </div>
      ))}
      {allCandidates?.length == 0 && (
        <div className="mx-auto flex flex-col items-center gap-4">
          <div className="text-4xl font-medium text-prim">
            No Candidates Found
          </div>
          <img
            src="https://cdn.dribbble.com/users/1208688/screenshots/4563859/no-found.gif"
            className="max-w-xl"
          />
        </div>
      )}
    </div>
  );
}

export default ViewCandidates;
