import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ACTIONS from "../../Config/action";
import { apiCaller } from "../../utils/fetcher";
import { showNotification } from "../../utils";
import { Link, useNavigate } from 'react-router-dom'



const initialState = {
  profile: {},
  authFlag: false
};

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ name, email, pwd, navigate }, { dispatch }) => {
    let user = { name, email, pwd };
    try {
      let response = false;
      const {
        data: { isAuth },
      } = await apiCaller.post("/register", user);
      dispatch(setAuthFlag(isAuth));
      dispatch(setProfile(user));
      navigate("/login");
      
    } catch (error) {
      console.error(error.message);
    }
  }
)

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ email, pwd, navigate }, { dispatch }) => {
    let response = false;
    // dispatch(startLoadingApp());
    try {
      // Get profile data from Backend
      const {
        data: { isAuth, user },
      } = await apiCaller.post("/login", {
        email,
        pwd,
        admin : 1
      });
      dispatch(setAuthFlag(isAuth));
      dispatch(setProfile(user));
      if(isAuth){
        navigate("/")
      } else {
        alert("The authentication info is incorrect or you are not administrator.");
        navigate("/login");
      }
      
      response = true;

    } catch (err) { }
    // dispatch(stopLoadingApp());
    return response;
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { dispatch }) => {
    dispatch(setAuthFlag(false));
    dispatch(setProfile({}));
    navigate("/login");
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
      localStorage.profile = JSON.stringify( action.payload );
    },
    setAuthFlag: (state, action) => {
      state.authFlag = action.payload;
      localStorage.authFlag = action.payload;
    }
  },
});

export const { setProfile, setAuthFlag } = authSlice.actions;

export default authSlice.reducer;
