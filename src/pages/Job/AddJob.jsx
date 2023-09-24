import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import chroma from "chroma-js";
import axios from "axios";
import { GrTest } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function AddJob() {

  const navigate = useNavigate()

  const [jobTitle, setJobTitle] = useState({});
  const [jtLoading, setJtLoading] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [jdLoading, setJdLoading] = useState(false);
  const [jdReccs, setJdReccs] = useState([]);

  const [jdEvaluation, setJdEvaluation] = useState(null);
  const [jdEvalLoading, setJdEvalLoading] = useState(false);

  const jobProfiles = [
    {
      value: "Branch Manager",
      label: "Branch Manager",
      description:
        "Responsible for overseeing daily operations and managing staff at a bank branch.",
    },
    {
      value: "Software Developer",
      label: "Software Developer",
      description:
        "Designs, develops, and maintains software applications",
    },
    {
      value: "Relationship Manager",
      label: "Relationship Manager",
      description:
        "Builds and maintains relationships with clients, offering financial advice and solutions.",
    },
    {
      value: "Customer Service Executive",
      label: "Customer Service Executive",
      description:
        "Assists customers with inquiries, transactions, and problem resolution.",
    },
    {
      value: "Loan Officer",
      label: "Loan Officer",
      description:
        "Evaluates loan applications, assesses creditworthiness, and processes loan approvals.",
    },
    {
      value: "Credit Analyst",
      label: "Credit Analyst",
      description:
        "Analyzes credit data and financial statements to determine credit risk for loan applicants.",
    },
    {
      value: "Teller",
      label: "Teller",
      description:
        "Handles cash transactions, processes deposits, withdrawals, and provides account information.",
    },
    {
      value: "Financial Advisor",
      label: "Financial Advisor",
      description:
        "Provides investment advice and financial planning services to customers.",
    },
    {
      value: "Risk Manager",
      label: "Risk Manager",
      description:
        "Identifies and assesses potential risks that may impact the bank's operations.",
    },
    {
      value: "Operations Manager",
      label: "Operations Manager",
      description:
        "Oversees day-to-day operations, including administrative tasks and compliance.",
    },
    {
      value: "Treasury Analyst",
      label: "Treasury Analyst",
      description:
        "Manages the bank's liquidity, cash flow, and financial assets.",
    },
    {
      value: "Mortgage Consultant",
      label: "Mortgage Consultant",
      description:
        "Assists customers in obtaining mortgage loans for real estate purchases.",
    },
    {
      value: "Audit Officer",
      label: "Audit Officer",
      description:
        "Conducts internal audits to ensure compliance with regulations and internal policies.",
    },
    {
      value: "Marketing Specialist",
      label: "Marketing Specialist",
      description:
        "Develops and implements marketing campaigns to promote banking products and services.",
    },
    {
      value: "Human Resources Manager",
      label: "Human Resources Manager",
      description:
        "Manages HR functions, including recruitment, training, and employee relations.",
    },
    {
      value: "IT Support Specialist",
      label: "IT Support Specialist",
      description:
        "Provides technical support and maintains the bank's IT infrastructure.",
    },
    {
      value: "Business Analyst",
      label: "Business Analyst",
      description:
        "Analyzes data and market trends to support strategic decision-making.",
    },
    {
      value: "Compliance Officer",
      label: "Compliance Officer",
      description:
        "Ensures the bank adheres to regulatory and legal requirements.",
    },
    {
      value: "Branch Operations Executive",
      label: "Branch Operations Executive",
      description: "Manages various operational tasks within a bank branch.",
    },
    {
      value: "Product Manager",
      label: "Product Manager",
      description: "Develops and manages banking products and services.",
    },
    {
      value: "Wealth Manager",
      label: "Wealth Manager",
      description:
        "Offers personalized financial and investment advice to high-net-worth clients.",
    },
    {
      value: "Digital Banking Specialist",
      label: "Digital Banking Specialist",
      description:
        "Supports and promotes digital banking solutions and services.",
    },
    {
      value: "Fraud Investigator",
      label: "Fraud Investigator",
      description:
        "Detects and investigates fraudulent activities within the bank.",
    },
    {
      value: "Trade Finance Specialist",
      label: "Trade Finance Specialist",
      description:
        "Manages international trade transactions and financing for clients.",
    },
    {
      value: "Collections Officer",
      label: "Collections Officer",
      description:
        "Handles delinquent accounts and implements collection strategies.",
    },
    {
      value: "Economist",
      label: "Economist",
      description:
        "Analyzes economic trends and provides insights for informed decision-making.",
    },
    {
      value: "Legal Counsel",
      label: "Legal Counsel",
      description:
        "Provides legal advice on regulatory matters, contracts, and disputes.",
    },
    {
      value: "Compliance Analyst",
      label: "Compliance Analyst",
      description:
        "Assists in monitoring and ensuring the bank's compliance with regulations.",
    },
    {
      value: "Business Development Officer",
      label: "Business Development Officer",
      description:
        "Expands the bank's customer base and explores new business opportunities.",
    },
    {
      value: "Data Analyst",
      label: "Data Analyst",
      description:
        "Analyzes financial data to extract insights and support strategic planning.",
    },
    {
      value: "Cash Management Specialist",
      label: "Cash Management Specialist",
      description:
        "Manages the bank's cash flow and liquidity to optimize financial operations.",
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
        navigate("/viewJobs")
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    document.title = `Add New Job | hAIr`;
  
    
  }, [])
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
                25+ Axis Bank relevant titles
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
