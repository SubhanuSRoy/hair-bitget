import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    email: null,
    password: null,
    userName: null,
    pfp_link:null,
  },
  reducers: {
    register(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.userEmail;
      state.password = action.payload.userPassword;
      state.userName = action.payload.userName;
      state.pfp_link = action.payload.pfp_link
    },
    login(state,action) {
      state.isLoggedIn = true;
      state.email = action.payload.userEmail;
      state.password = action.payload.userPassword;
      state.userName = action.payload.userName;
      state.pfp_link = action.payload.pfp_link
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null
      state.password = null
      state.userName = null
      state.userType = null
      state.pfp_link = null
    },
    
  },
});

export const authActions = authSlice.actions;

export default authSlice;
