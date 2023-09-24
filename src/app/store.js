import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import jobSlice from '../features/job/job-slice';
import candidateSlice from '../features/candidate/candidate-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    job: jobSlice.reducer,
    candidate: candidateSlice.reducer,
  },
});
