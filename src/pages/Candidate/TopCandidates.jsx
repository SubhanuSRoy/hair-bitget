import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TopCandidates() {
  const job = useSelector((state) => state.job);

  const [numberChosen, setNumberChosen] = useState(3);
  const [topCandidates, setTopCandidates] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendTopCandidatesRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("getting top candidates");
    axios
      .post(process.env.REACT_APP_BACKEND + "getTopCandidates", {
        jobId: job.id,
        number: Number(numberChosen),
      })
      .then((res) => {
        console.log(res.data);
        setTopCandidates(res.data);
        setLoading(false);
        // setalljobs(res.data.alljobs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="w-full flex flex-col items-center text-white">
      <form
        className="flex h-16 items-center w-full justify-between  gap-4 px-4"
        onSubmit={sendTopCandidatesRequest}
      >
        <span className="text-2xl font-bold">
          Top Candidates{" "}
          {loading && (
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              className="w-20"
            />
          )}
        </span>
        <input
          type="number"
          value={numberChosen}
          className="border-2 border-gray-300 rounded-md p-2 w-1/4"
          onChange={(e) => setNumberChosen(e.target.value)}
        />
      </form>

      {/* To show all the resume scores */}
      {topCandidates && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-gray-50 rounded-md flex flex-col items-center">
            <div className="text-2xl font-medium">Final Scores</div>
            <BarChart
              width={1000}
              height={500}
              data={topCandidates?.FinalScores}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="email" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="w-full bg-gray-50 rounded-md flex flex-col items-center">
            <div className="text-2xl font-medium">
              Emotional Analysis Scores
            </div>
            <BarChart
              width={1000}
              height={500}
              data={topCandidates?.VideoAnlytics}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="email" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(topCandidates?.VideoAnlytics[0]).map(
                (emotion, index) => (
                  <Bar dataKey={emotion} fill={COLORS[index % COLORS.length]} />
                )
              )}
              {/* <Bar dataKey="score" fill={COLORS[index % COLORS.length]} /> */}
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopCandidates;
