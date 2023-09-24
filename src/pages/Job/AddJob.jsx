import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import chroma from "chroma-js";
import axios from "axios";
import { GrTest } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState({});
  const [jtLoading, setJtLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [jdLoading, setJdLoading] = useState(false);
  const [jdReccs, setJdReccs] = useState([]);

  const [jdEvaluation, setJdEvaluation] = useState(null);
  const [jdEvalLoading, setJdEvalLoading] = useState(false);

  const jobProfiles = [
    {
      value: "Blockchain Developer",
      label: "Blockchain Developer",
      description: "Designs, develops, and maintains blockchain applications",
    },
    {
      value: "Smart Contract Developer",
      label: "Smart Contract Developer",
      description:
        "Creates and deploys smart contracts on blockchain platforms",
    },
    {
      value: "Cryptocurrency Analyst",
      label: "Cryptocurrency Analyst",
      description: "Analyzes cryptocurrency markets and trends",
    },
    {
      value: "Security Engineer (Blockchain)",
      label: "Security Engineer (Blockchain)",
      description: "Implements security measures for blockchain systems",
    },
    {
      value: "Blockchain UX/UI Designer",
      label: "Blockchain UX/UI Designer",
      description: "Designs user interfaces for blockchain applications",
    },
    {
      value: "Blockchain Solutions Architect",
      label: "Blockchain Solutions Architect",
      description:
        "Designs and oversees the implementation of blockchain solutions",
    },
    {
      value: "Blockchain Researcher",
      label: "Blockchain Researcher",
      description:
        "Conducts research on blockchain technology and applications",
    },
    {
      value: "Decentralized Application (dApp) Developer",
      label: "Decentralized Application (dApp) Developer",
      description:
        "Develops decentralized applications on blockchain platforms",
    },
    {
      value: "Blockchain Project Manager",
      label: "Blockchain Project Manager",
      description:
        "Manages projects related to blockchain development and implementation",
    },
    {
      value: "Blockchain Quality Assurance (QA) Engineer",
      label: "Blockchain Quality Assurance (QA) Engineer",
      description:
        "Ensures the quality and reliability of blockchain applications",
    },
    {
      value: "Cryptocurrency Wallet Developer",
      label: "Cryptocurrency Wallet Developer",
      description: "Develops digital wallets for storing cryptocurrencies",
    },
    {
      value: "Blockchain Compliance Specialist",
      label: "Blockchain Compliance Specialist",
      description: "Ensures compliance with regulations in blockchain projects",
    },
    {
      value: "Blockchain Marketing Specialist",
      label: "Blockchain Marketing Specialist",
      description: "Markets and promotes blockchain products and services",
    },
    {
      value: "Blockchain Data Analyst",
      label: "Blockchain Data Analyst",
      description: "Analyzes data on the blockchain for insights and trends",
    },
    {
      value: "Cryptocurrency Exchange Developer",
      label: "Cryptocurrency Exchange Developer",
      description: "Develops and maintains cryptocurrency exchange platforms",
    },
    {
      value: "Blockchain System Administrator",
      label: "Blockchain System Administrator",
      description:
        "Administers and maintains blockchain network infrastructure",
    },
    {
      value: "Blockchain Legal Consultant",
      label: "Blockchain Legal Consultant",
      description:
        "Provides legal advice and consultation for blockchain projects",
    },
    {
      value: "Blockchain Integration Specialist",
      label: "Blockchain Integration Specialist",
      description:
        "Integrates blockchain technology with existing systems and processes",
    },
    {
      value: "Cryptocurrency Mining Engineer",
      label: "Cryptocurrency Mining Engineer",
      description: "Manages and optimizes cryptocurrency mining operations",
    },
    {
      value: "Blockchain Educator",
      label: "Blockchain Educator",
      description: "Provides education and training on blockchain technology",
    },
    {
      value: "Blockchain UI/UX Researcher",
      label: "Blockchain UI/UX Researcher",
      description: "Conducts user research for blockchain interface design",
    },
    {
      value: "Cryptocurrency Compliance Officer",
      label: "Cryptocurrency Compliance Officer",
      description:
        "Ensures compliance with regulatory requirements in cryptocurrency operations",
    },
    {
      value: "Blockchain Ethical Hacker",
      label: "Blockchain Ethical Hacker",
      description:
        "Tests and identifies security vulnerabilities in blockchain systems",
    },
    {
      value: "Cryptocurrency Financial Analyst",
      label: "Cryptocurrency Financial Analyst",
      description:
        "Analyzes financial aspects of cryptocurrency markets and investments",
    },
    {
      value: "Blockchain Social Media Manager",
      label: "Blockchain Social Media Manager",
      description:
        "Manages social media presence and engagement for blockchain projects",
    },
  ];

  const handleJobTitle = (selectedOption) => {
    console.log(selectedOption);
    setJobTitle(selectedOption);
  };

  const getJobDescription = async (e) => {
    e.preventDefault();
    console.log(jobTitle);
    setJtLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND + "getJobDescription", {
        jobTitle: jobTitle.value,
        // jobDescription: jobTitle.description,
      })
      .then((res) => {
        console.log(res.data);
        setJobDescription(res.data.jobDescription);
        setJtLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJDRecommendation = async (e) => {
    e.preventDefault();
    console.log(jobTitle);
    setJdLoading(true);
    axios

      .post(process.env.REACT_APP_BACKEND + "jobDescriptionRecommendation", {
        jobTitle: jobTitle.value,
        jobDescription: jobDescription,
      })
      .then((res) => {
        console.log(res);
        // setJobDescription(res.data.jobDescription);
        setJdReccs(res.data.status.jobRecommendations);
        setJdLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJDChange = (text) => {
    setJobDescription(text);
  };

  const getEvaluation = async (e) => {
    e.preventDefault();
    console.log(jobTitle);
    setJdEvalLoading(true);
    axios
      .post(process.env.REACT_APP_BACKEND + "jobDescriptionTextEvaluation", {
        jobTitle: jobTitle.value,
        jobDescription: jobDescription,
      })
      .then((res) => {
        console.log(res);
        setJdEvaluation(res.data);
        setJdEvalLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addJob = async (e) => {
    e.preventDefault();
    console.log(jobTitle);

    axios
      .post(process.env.REACT_APP_BACKEND + "processJobDescription", {
        jobTitle: jobTitle.value,
        jobDescription: jobDescription,
      })
      .then((res) => {
        console.log(res);
        navigate("/viewJobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.title = `Add New Job | hAIr`;
  }, []);
  return (
    <div className="flex flex-col w-full h-full mt-4 gap-4">
      <form
        className="flex flex-col w-full border-2 border-accent p-2 rounded-md bg-gray-900 shadow-sm"
        onSubmit={getJobDescription}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-4 text-gray-100  px-4">
            <h1 className="text-2xl text-prim font-bold">
              1) Generate Job Description from Job Title
            </h1>
            <p>
              Choose from{" "}
              <span className="text-prim font-medium">
                25+ Bitget relevant titles
              </span>{" "}
              or create your own job title and press Enter to let hAIr generate
              the <span className="text-prim font-medium">Job Description</span>
            </p>
          </div>
          {jtLoading && (
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              className="w-20"
            />
          )}
        </div>

        <CreatableSelect
          required
          options={jobProfiles}
          onChange={handleJobTitle}
          value={jobTitle}
          isSearchable
          className="rounded-md p-2 mx-auto w-full"
          //   styles={colourStyles}
        />
      </form>

      <form className="flex flex-col w-full h-80 p-2 border-2 border-accent rounded-md bg-gray-900">
        <div className="flex items-end gap-4 justify-between text-gray-100  px-4">
          <div>
            <h1 className="text-2xl text-prim font-bold">
              2) Get JD Recommendations
            </h1>
            <p>
              Make changes to the{" "}
              <span className="text-prim font-medium">
                generated job description
              </span>{" "}
              or type your existng job description to
              <span className="text-prim font-medium">
                {" "}
                get recommendations{" "}
              </span>
            </p>
          </div>
          {!jdLoading && (
            <button
              className="bg-transparent text-prim border-2 border-prim rounded-md p-2 hover:bg-prim hover:text-gray-900"
              onClick={getJDRecommendation}
            >
              Get Recommendations
            </button>
          )}

          {jdLoading && (
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              className="w-20"
            />
          )}
          {!jdEvalLoading && (
            <button
              className="bg-prim text-gray-900 rounded-md p-2"
              onClick={getEvaluation}
            >
              Get Evaluation
              {/* <GrTest /> */}
            </button>
          )}
          {jdEvalLoading && (
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              className="w-20"
            />
          )}
        </div>
        <textarea
          type="text"
          placeholder=""
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 m-2 h-full"
        />
      </form>

      {jdReccs?.length > 0 && (
        <form className="flex flex-col w-full max-h-80 p-2 border-2 border-accent rounded-md bg-gray-900">
          <div className="flex items-end gap-4 text-gray-100  px-4">
            <h1 className="text-2xl text-prim font-bold">
              Choose a Recommendation
            </h1>
            <p>
              Choose a{" "}
              <span className="text-prim font-medium">
                recommendation for your job description
              </span>{" "}
              to make it more{" "}
              <span className="text-prim font-medium">relevant</span> and{" "}
              <span className="text-prim font-medium">inclusive</span>{" "}
              <span className="text-xs text-gray-500">
                (It will automatically update the above job decsription)
              </span>
            </p>
          </div>
          <div className="flex w-full items-center">
            {jdReccs?.map((rec) => {
              return (
                <div
                  className={
                    jdReccs?.length > 1
                      ? `w-1/${jdReccs?.length} flex flex-col gap-4`
                      : "w-full flex flex-col gap-4"
                  }
                >
                  <textarea
                    type="text"
                    placeholder="Job Description Recommended"
                    value={rec.jobDescription}
                    className="border-2 border-gray-300 rounded-md p-2 m-2 h-full"
                  />
                  <button
                    className="bg-prim text-gray-900 rounded-md p-2 w-1/2 mx-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      handleJDChange(rec.jobDescription);
                    }}
                  >
                    Choose this
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      )}

      {jdEvaluation && (
        <div className="flex flex-col w-full min-h-80 p-2 border-2 border-accent rounded-md bg-gray-900">
          <div className="flex items-end gap-4 justify-between text-gray-100  px-4">
            <div>
              <h1 className="text-2xl text-prim font-bold">
                Your JD Evaluation
              </h1>
              <p>
                You can now make these{" "}
                <span className="text-prim font-medium">
                  changes to the job description
                </span>{" "}
                using the{" "}
                <span className="text-prim font-medium">keywords </span>
                and <span className="text-prim font-medium">pointers </span>
                mentioned
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-prim font-bold">Clean Keywords</h1>
              <div className="flex flex-wrap gap-2">
                {jdEvaluation?.cleanKeywords &&
                  jdEvaluation?.cleanKeywords.map((keyword) => (
                    <span className="bg-transparent text-prim border-2 border-prim rounded-md p-2">
                      {keyword}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-prim font-bold">Recommended Keywords</h1>
              <div className="flex flex-wrap gap-2">
                {jdEvaluation?.recommendedKeywords &&
                  jdEvaluation?.recommendedKeywords.map((keyword) => (
                    <span className="bg-transparent text-prim border-2 border-prim rounded-md p-2">
                      {keyword}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-prim font-bold">Enhancement Pointers</h1>
              <div className="flex flex-wrap gap-2">
                {jdEvaluation?.enhancementPointers &&
                  jdEvaluation.enhancementPointers.map((keyword) => (
                    <span className="bg-transparent text-prim border-2 border-prim rounded-md p-2">
                      {keyword}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="group relative inline-flex items-center overflow-hidden rounded bg-gradient-to-tr from-prim to-accent px-8 py-3 text-gray-900 focus:outline-none focus:ring active:bg-pink-500"
        onClick={addJob}
      >
        <span class="absolute -end-full transition-all group-hover:end-4">
          <svg
            class="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span class="text-3xl font-bold transition-all group-hover:me-4">
          Upload Job
        </span>
      </button>
    </div>
  );
}

export default AddJob;
