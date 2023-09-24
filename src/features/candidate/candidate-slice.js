import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    details: null,
  },
  reducers: {
    setCandidate(state, action) {
      state.details = action.payload.details;
    },
    
  },
});

export const candidateActions = candidateSlice.actions;

export default candidateSlice;
