import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";

function AddVideoLink() {
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [videoLinks, setVideoLink] = useState({
    link1: "",
    link2: "",
    link3: "",
    link4: "",
  });

  const [cLoading, setCLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitVideoLink = async (e) => {
    setSubmitLoading(true);
    e.preventDefault();
    const data = {
      unique_id: candidateId,
      videoLinks: videoLinks,
    };
    axios
      .post(process.env.REACT_APP_BACKEND + "videoAnalysis", data)
      .then((res) => {
        setSubmitLoading(false);
        console.log(res.data);
        // alert("Video Links Submitted Successfully");
        navigate("/success");
      })
      .catch((error) => {
        setSubmitLoading(false);
        console.log(error.message);
      });
  };

  const findCandidate = async (e) => {
    setCLoading(true);
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND + "getEmailBody", {
        unique_id: candidateId,
      })
      .then((res) => {
        setCLoading(false);
        // console.log(res.data);
        const originalText = res.data;
        const questionStart = originalText.indexOf("1. ");
        const questionEnd = originalText.indexOf("5. ", questionStart + 1);
        const questionsText = originalText.substring(
          questionStart,
          questionEnd
        );
        const questionsArray = questionsText
          .split(/\d+\.\s+/)
          .filter((item) => item);
        console.log(questionsArray);
        setQuestions(questionsArray);
      })
      .catch((error) => {
        setCLoading(false);
        console.log(error.message);
      });
  };
  useEffect(() => {
    document.title = `1st Round Interview | hAIr`;
  }, []);
  return (
    <div className="flex flex-col items-center w-full h-full mt-4 gap-4 bg-transparent text-white">
      <form onSubmit={findCandidate} className="flex gap-4 items-center w-1/2">
        <div className="font-medium text-lg">
          Enter your Candidate ID{" "}
          <span className="block font-light text-gray-300 m-0">(in email)</span>
        </div>
        <input
          type="text"
          placeholder="Enter Candidate Id"
          value={candidateId}
          onChange={(e) => {
            setCandidateId(e.target.value);
          }}
          className="px-3 py-2 w-1/2  border-2 border-prim rounded-md flex-grow"
        />
        {!cLoading && (
          <button className="bg-gradient-to-tr from-prim to-accent rounded-md px-3 py-2 text-xl text-gray-900 font-bold">
            Search
          </button>
        )}
        {cLoading && (
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            className="w-20"
          />
        )}
      </form>
      {questions.length > 0 && (
        <div className="w-1/2">
          <div className="font-medium text-lg">
            Upload Youtube Links for the questions mentioned below:
          </div>
          {questions?.map((question, index) => (
            <p key={index}>{`${index + 1}. ${question}`}</p>
          ))}
        </div>
      )}

      <form onSubmit={submitVideoLink} className="flex flex-col gap-4 w-1/2">
        <div className="font-medium text-lg flex items-center gap-4">
          Enter your Video Links{" "}
          <span>
            <BsYoutube className="fill-red-500" />
          </span>
        </div>
        {Object?.keys(videoLinks)?.map((link, index) => {
          return (
            <div className="w-full flex flex-col">
              {/* <iframe width="560" height="315" src={videoLinks[link]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
              <input
                key={index}
                type="text"
                placeholder={`Enter Video Link ${index + 1}`}
                value={videoLinks[link]}
                onChange={(e) => {
                  setVideoLink({ ...videoLinks, [link]: e.target.value });
                }}
                className="px-3 py-2  border-2 border-prim rounded-md"
              />
            </div>
          );
        })}
        {!submitLoading && (
          <button className="bg-gradient-to-tr from-prim to-accent rounded-md px-3 py-2 text-xl text-gray-900 font-bold">
            Submit Links
          </button>
        )}
        {submitLoading && (
          <div className="flex items-center gap-4 w-full justify-center">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              className="w-20"
            />
            <p>Processing the videos. Can take upto 5 mins.</p>
          </div>
        )}
      </form>
      {/* <input
        type="text"
        placeholder="Enter Video Link"
        value={videoLink}
        onChange={(e) => {
          setVideoLink(e.target.value);
        }}
      /> */}
    </div>
  );
}

export default AddVideoLink;
