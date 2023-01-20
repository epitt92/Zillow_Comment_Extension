import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/slices/authSlice';
import "./Loginregister.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import Comments from './Comments';

const Homepage = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutAction({navigate}));
    }

    const { authFlag, profile } = useSelector((state) => ({
        authFlag : state.auth.authFlag, 
        profile : state.auth.profile
    }));
    return(
        <>
          <Navbar />
          <Comments />
        </>
    );
}
export default Homepage;