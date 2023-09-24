import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen p-4">
      <header
        aria-label="Site Header"
        className="bg-gradient-to-tr from-prim to-accent rounded-md shadow-sm "
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center gap-4 text-gray-900">
              <div className="block text-gray-900 font-bold text-4xl">
                {/* <img src={logo} width={100} /> */}
                <span className="font-bold">hAIr</span>
              </div>
              <div>
                Plugging the <span className="font-bold">AI</span> in the <span className="font-bold">HR</span>
              </div>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              {/* <div className="text-gray-900 font-bold text-2xl">Perfect Job Post in 3 Steps</div> */}

              <div className="text-gray-900 font-bold text-2xl">
                <Link to="/">Post Job</Link>
              </div>
              <div className="text-gray-900 font-bold text-2xl">
                <Link to="/viewJobs">All Jobs</Link>
              </div>
              <div className="text-gray-900 font-bold text-2xl">
                <Link to="/viewCandidates">All Candidates</Link>
              </div>
              <div className="text-gray-900 font-bold text-2xl">
                <Link to="/firstRoundInterview">Interview</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

export default Layout;
