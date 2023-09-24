import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


function Converse() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [searchQuery, setSearchQuery] = useState(null);
  const [AIResponse, setAIResponse] = useState("");
  const [loading, setloading] = useState(false);

  const [messages, setMessages] = useState([]);

  const listen = () => {
    resetTranscript();
    SpeechRecognition.startListening();
    setSearchQuery(transcript);
  };
  const updateQuery = () => {
    SpeechRecognition.stopListening();
    console.log(transcript);
    setSearchQuery(transcript);
  };

  const getRes = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(searchQuery);
    axios
      .post(process.env.REACT_APP_AI_SERVER + "get_chat", {
        Question: searchQuery,
      })
      .then((res) => {
        console.log(res.data);
        setAIResponse(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const showMessages = async () => {
    setloading(false);
    setMessages((oldArr) => [
      ...oldArr,
      {
        query: searchQuery,
        ans: AIResponse,
      },
    ]);
  };
  useLayoutEffect(() => {
    console.log("inside useEffect");
    if (AIResponse.length > 0) {
      showMessages();
    }
  }, [AIResponse]);

  const data = {
    jobs: [
      {
        role: "SDE",
        company: "Microsoft",
        salary: "15LPA",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        role: "SDE",
        company: "Microsoft",
        salary: "15LPA",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
    courses: [
      {
        title: "Java Crash Course",
        course_creator: "Tim Buchalka",
        totalTime: "15hrs",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        title: "Java Crash Course",
        course_creator: "Tim Buchalka",
        totalTime: "15hrs",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
    mentors: [
      {
        mentor_name: "Jonathan Watson",
        quali: "Btech",
        tags: ["software", "backend"],
        img: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        mentor_name: "Jonathan Watson",
        quali: ["Btech", "MTech"],
        tags: ["software", "backend"],
        img: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen ">
      {/* <div className="flex items-center gap-8 ">
        <div className="flex flex-col items-center gap-4 border-2 border-gray-500 rounded-md p-4">
          <h1 className="text-gray-50">Jobs</h1>
          {data.jobs.map((job) => {
            return (
              <Jobs
                logo={job.logo}
                role={job.role}
                company={job.company}
                salary={job.salary}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 items-center border-2 border-gray-500 rounded-md p-4">
          <h1 className="text-gray-50">Courses</h1>
          {data.courses.map((course) => {
            return (
              <Courses
                logo={course.logo}
                title={course.title}
                creator_name={course.course_creator}
                totalTime={course.totalTime}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 items-center border-2 border-gray-500 rounded-md p-4">
          <h1 className="text-gray-50">Mentors</h1>
          {data.mentors.map((mentor) => {
            return (
              <Mentors
                imgUrl={mentor.img}
                name={mentor.mentor_name}
                quali={mentor.quali}
                tags={mentor.tags}
              />
            );
          })}
        </div>
      </div> */}

      {/* chat */}
      <div class="flex flex-col w-3/4 bg-transparent h-3/4 shadow-xl rounded-lg overflow-auto">
        {messages?.map((m) => {
          return (
            <div class="flex flex-col flex-grow h-fit  p-4 ">
              <div class="flex w-full mt-2 space-x-3 max-w-full">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <div class="bg-gray-300 p-3  rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">{m.query}</p>
                  </div>
                  {/* <span class="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span> */}
                </div>
              </div>
              <div class="flex w-full mt-2 space-x-3 ml-auto justify-end">
                <div>
                  <div class="bg-midnight text-gray-50 p-3 rounded-l-lg rounded-br-lg">
                    <pre class="text-sm whitespace-pre-wrap">{m.ans}</pre>
                  </div>
                  {/* <span class="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span> */}
                </div>
                {/* <img
                  class="flex-shrink-0 h-10 w-10 rounded-full"
                  href="https://img.freepik.com/premium-vector/cute-robot-chatbot-icon-comic-style-bot-operator-vector-cartoon-illustration-pictogram-smart-chatbot-character-business-concept-splash-effect_157943-5413.jpg?w=2000"
                /> */}
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500"></div>
              </div>
            </div>
          );
        })}

        {/* <div class="bg-gray-300 p-4">
        <input
          class="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
        />
      </div> */}
      </div>

      {messages.length < 1 && (
        <div className="flex gap-8 w-1/2 h-3/4 mt-32">
          <div className="flex flex-col gap-4 text-gray-400 items-center w-1/3 h-full">
            <h2 className="text-xl flex items-center gap-2">
              Examples
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </h2>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              What skills do I need to be a Product Designer?
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              How to learn Python for Machine Learning?
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Show me software jobs
            </div>
          </div>
          <div className="flex flex-col gap-4 text-gray-400 items-center w-1/3">
            <h2 className="text-xl flex items-center gap-2">
              Capabilities
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </h2>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Personalised Job Recommendations
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Advanced Ml algorithm to match you with experienced professionals
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Efficient upskilling with relevant multi language course content
            </div>
          </div>
          <div className="flex flex-col gap-4 text-gray-400 items-center w-1/3">
            <h2 className="text-xl flex items-center gap-2">
              Limitations
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
            </h2>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              May occassionaly give incorrect information
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Cannot chat with mentors (Yet!)
            </div>
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              May occassionaly give biased results
            </div>
          </div>
        </div>
      )}

      {/* input */}
      <div className="fixed bottom-8 w-3/4">
        <form class="w-full flex items-center gap-4">
          <div class="relative flex items-center flex-grow">
            <input
              class="h-20 w-full rounded-lg border-gray-200 pl-8 pr-10 text-gray-300 text-lg outline-none bg-midnight placeholder-gray-300 focus:z-10"
              placeholder="Computer jobs in India..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
            />

            {!listening && (
              <button
                type="submit"
                onClick={listen}
                class="absolute  right-2 rounded-full p-2  text-gray-50 hover:bg-primary"
              >
                <span class="sr-only">Start Listening</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}
            {listening && (
              <button
                type="submit"
                onClick={updateQuery}
                class="absolute right-2 rounded-full p-2  text-red-500 bg-primary"
              >
                <span class="sr-only">Stop Listening</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}
          </div>
          {loading ? (
            <img
              className="h-12"
              src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            />
          ) : (
            <></>
          )}
          <button
            className="bg-primary p-4 h-16 rounded-md text-center"
            onClick={getRes}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Converse;
