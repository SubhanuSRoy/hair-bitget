import React, { useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Converse from "./pages/Portal/Converse";

import { useSelector } from "react-redux";
import AddJob from "./pages/Job/AddJob";
import ViewJobs from "./pages/Job/ViewJobs";
import ViewJob from "./pages/Job/ViewJob";
import AddVideoLink from "./pages/Interview/AddVideoLink";
import InterviewSuccess from "./pages/Interview/InterviewSuccess";
import ViewCandidates from "./pages/Candidate/ViewCandidates";
import ViewCandidate from "./pages/Candidate/ViewCandidate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <AddJob />
            </Layout>
          }
        />
        <Route
          path="/viewJobs"
          element={
            <Layout>
              <ViewJobs />
            </Layout>
          }
        />
        <Route
          path="/viewJob/:jobId"
          element={
            <Layout>
              <ViewJob />
            </Layout>
          }
        />
        <Route
          path="/firstRoundInterview"
          element={
            <Layout>
              <AddVideoLink />
            </Layout>
          }
        />
        <Route
          path="/success"
          element={
            <Layout>
              <InterviewSuccess />
            </Layout>
          }
        />
        <Route
          path="/viewCandidates"
          element={
            <Layout>
              <ViewCandidates />
            </Layout>
          }
        />
        <Route
          path="/viewCandidate/:candidateId"
          element={
            <Layout>
              <ViewCandidate />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
