import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { SiCoursera } from "react-icons/si";

function ViewCandidate() {
  const details = useSelector((state) => state.candidate.details);
  console.log(details);

  const [gaps, setGaps] = useState(
    details.ResumeGaps ? details.ResumeGaps : {}
  );

  const [summary, setSummary] = useState(
    details.ResumeSummary ? details.ResumeSummary : ""
  );

  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

  useEffect(() => {
    if (details?.ResumeGaps?.length < 1) {
      axios
        .post(process.env.REACT_APP_BACKEND + "getGaps", {
          unique_id: details.unique_id,
        })
        .then((res) => {
          console.log(res.data);
          setGaps(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    if(details?.ResumeSummary?.length<1)
    {
      axios
        .post(process.env.REACT_APP_BACKEND + "getSummary", {
          unique_id: details.unique_id,
        })
        .then((res) => {
          console.log(res.data);
          setSummary(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full mt-4 gap-4 bg-transparent">
      <div className="flex flex-col gap-4 bg-gray-100 rounded-md p-4 shadow-sm">
        <div className="font-bold text-lg w-full flex justify-between">
          <div>{details?.emails[0]}</div>
          <div className="text-prim">{details?.jobId}</div>
        </div>

        <details className="font-semibold text-lg text-prim bg-gray-900 rounded-md shadow-md p-4">
          <summary>Resume Data</summary>
          <pre className="text-gray-300 text-xs text-justify overflow-x-auto">
            {details?.resume_data}
          </pre>
        </details>

        <details className="font-semibold text-lg text-prim bg-gray-900 rounded-md shadow-md p-4">
          <summary>Email Sent with Screening Questions</summary>
          <pre className="text-gray-200 text-xs text-justify overflow-x-auto font-normal">
            {details?.emailBody}
          </pre>
        </details>

        <details className="font-semibold text-lg text-prim bg-gray-900 rounded-md shadow-md p-4">
          <summary>
            Answers to with Screening Questions (extracted from Video)
          </summary>
          <div>
            {details?.videoAnalysis?.audioAnalysis?.map((q, index) => (
              <div key={index} className="px-3 py-2 text-gray-200 font-normal">
                {index + 1}. {q}
              </div>
            ))}
          </div>
        </details>

        <details className="font-semibold text-lg text-prim bg-gray-900 rounded-md shadow-md p-4">
          <summary className="">
            Sentiment Analysis of Each Answer
          </summary>
          <div className="flex items-center justify-around w-full text-gray-300">
            {details?.videoAnalysis?.videoAnalysis?.map((q, index) => {
              const og = q.label;

              const data = Object.keys(og).map((key) => ({
                name: key,
                value: og[key],
                // value: Math.round(og[key] + "e+2") + "e-2",
              }));
              return (
                <PieChart width={200} height={300}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#AE275F"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={q.label} />
                  <Legend />
                </PieChart>
              );
            })}
          </div>
        </details>

        <details className="text-gray-300 text-3xl bg-gray-900 rounded-md shadow-md p-4">
          <summary className="font-semibold text-lg text-prim">
            Final Score out of 100 for the Job
          </summary>
          {details?.videoAnalysis?.result?.output}
        </details>

        <details className="font-semibold text-lg text-prim bg-gray-900 rounded-md shadow-md p-4">
          <summary className="pb-4">Gaps identified in profile</summary>
          <div className="flex gap-4 text-gray-300">
            <div className="flex flex-col bg-gray-900 rounded-md p-4 shadow-md">
              <div>Gaps in Resume</div>
              <div className="flex flex-col gap-2 ">
                {gaps?.ResumeGaps?.map((gap, index) => (
                  <div key={index} className="px-3 py-2 font-normal">
                    {index + 1}. {gap}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col bg-gray-900 rounded-md p-4 shadow-md">
              <div>Training Required</div>
              <div className="flex flex-col gap-2">
                {gaps?.HR_Training_Programs?.map((training, index) => (
                  <div key={index} className="px-3 py-2 font-normal">
                    {index + 1}. {training}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col bg-gray-900 rounded-md p-4 shadow-md">
              <div>Course Links Topic wise</div>
              <div className="flex flex-col gap-2">
                {gaps?.Courses?.map((link, index) => (
                  <a
                    key={index}
                    className="px-3 py-2 font-normal text-blue-500 flex items-center gap-2"
                    href={link.CourseLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SiCoursera /> {link.CourseName}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </details>

        <details className="text-gray-300 text-xl bg-gray-900 rounded-md shadow-md p-4">
          <summary className="font-semibold text-lg text-prim">
            Summary
          </summary>
          {summary}
        </details>

      </div>
    </div>
  );
}

export default ViewCandidate;
