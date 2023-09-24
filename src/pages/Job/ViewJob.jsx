import React, { useEffect, useState } from "react";
import FileUpload from "../../Components/FileUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import TopCandidates from "../Candidate/TopCandidates";

function ViewJob() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const job = useSelector((state) => state.job);
  console.log(job);
  useEffect(() => {
    document.title = `View Job # ${job.id}`;
  
    
  }, [])
  

  return (
    <div className="flex flex-col w-full h-full mt-4 gap-4 bg-transparent">
      <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4 shadow-sm">
        <div className="font-bold text-lg w-full flex justify-between">{job?.id} <span className="text-prim">{job?.title}</span></div>
        <pre className="text-gray-700 text-xs text-justify overflow-x-auto">{job?.description}</pre>
      </div>

      {/* <form className="flex items-center gap-2 border-2 border-gray-50" onSubmit={uploadCV}>
        <input type="file" className="border-2 border-prim" />
        <input type="submit" value="Upload"/>
      </form> */}
      <FileUpload />
      <TopCandidates />
    </div>
  );
}

export default ViewJob;
