import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/slices/authSlice';
import "./Loginregister.css";

const Homepage = () =>{
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction({}));
    }

    const { authFlag, profile } = useSelector((state) => ({
        authFlag : state.auth.authFlag, 
        profile : state.auth.profile
    }));
    return(
        <>
            <div className="homepage">
                <h1>Hello {profile.name}</h1>
                <h4>Your email address {profile.email}</h4>
                <a href='https://zillow.com' target="_blank">Go to Zillow</a>
                <br />
                <div className="button" onClick={logout}>Logout</div>
            </div>
        </>
    );
}
export default Homepage;