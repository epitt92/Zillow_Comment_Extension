import './App.css';
import { useEffect, useState } from 'react';
import Homepage from './componets/Homepage';
import Users from './componets/Users';
import Login from './componets/Login';
import Register from './componets/Register';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthFlag, setProfile } from './redux/slices/authSlice';

function App() {

  const dispatch = useDispatch();

  const { authFlag } = useSelector((state) => ({
    authFlag : state.auth.authFlag
  }));
  useEffect(() => {
    if(localStorage.profile && localStorage.authFlag){
      let profile = JSON.parse(localStorage.profile);
      let authFlag = (localStorage.authFlag === 'true');
      if (authFlag){
        dispatch(setAuthFlag(authFlag));
        dispatch(setProfile(profile));
      }
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' 
          element={
          authFlag ? <Homepage /> : <Login />
          } ></Route>
          <Route path='/users' 
          element={
          authFlag ? <Users /> : <Login />
          } ></Route>
          <Route path='/login' element= {<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
