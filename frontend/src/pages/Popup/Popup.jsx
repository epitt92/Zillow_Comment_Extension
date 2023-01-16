import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Register from './components/Register';
import './Popup.css';

import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthFlag, setProfile } from './redux/slices/authSlice';

const Popup = () => {
  
  const dispatch = useDispatch();

  const { authFlag } = useSelector((state) => ({
    authFlag : state.auth.authFlag
  }));
  useEffect(() => {
    chrome.storage.local.get(null, (obj) => {
      dispatch(setProfile(obj.profile ? obj.profile : {}));
      dispatch(setAuthFlag(!!obj.authFlag));
    })
  }, [])
  return (
    <>
      <Router>
        { authFlag ? <Homepage /> : <Login />}
      </Router>
    </>
  );
};

export default Popup;
