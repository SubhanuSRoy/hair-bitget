import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    id: null,
    title: null,
    description: null,
  },
  reducers: {
    setJob(state, action) {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    
  },
});

export const jobActions = jobSlice.actions;

export default jobSlice;
