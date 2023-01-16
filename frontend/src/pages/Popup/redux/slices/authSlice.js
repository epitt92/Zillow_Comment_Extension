import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ACTIONS from "../../../Config/action";
import { apiCaller } from "../../utils/fetcher";

import {
  goBack,
  goTo,
  popToTop,
  Link,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import Homepage from "../../components/Homepage";
import Login from "../../components/Login";

const initialState = {
  profile: {},
  authFlag: false
};

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ name, email, pwd }, { dispatch }) => {
    let user = { name, email, pwd };
    try {
      let response = false;
      const {
        data: { isAuth },
      } = await apiCaller.post("/register", user);
      console.log("ISATUTH", isAuth)
      dispatch(setAuthFlag(isAuth));
      dispatch(setProfile(user));
      isAuth ? goTo(Homepage) : goTo(Login);
      
    } catch (error) {
      console.error(error.message);
    }
  }
)

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, pwd }, { dispatch }) => {
    let response = false;
    // dispatch(startLoadingApp());
    try {
      // Get profile data from Backend
      const {
        data: { isAuth, user },
      } = await apiCaller.post("/login", {
        email,
        pwd
      });
      dispatch(setAuthFlag(isAuth));
      dispatch(setProfile(user));
      isAuth ? goTo(Homepage) : goTo(Login);
      response = true;

    } catch (err) { }
    // dispatch(stopLoadingApp());
    return response;
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async ({}, { dispatch }) => {
    dispatch(setAuthFlag(false));
    dispatch(setProfile({}));
    goTo(Login);
    return true;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      chrome.storage.local.set({profile: action.payload});
    },
    setAuthFlag: (state, action) => {
      state.authFlag = action.payload;
      chrome.storage.local.set({authFlag: action.payload});
    }
  },
});

export const { setProfile, setAuthFlag } = authSlice.actions;

export default authSlice.reducer;
