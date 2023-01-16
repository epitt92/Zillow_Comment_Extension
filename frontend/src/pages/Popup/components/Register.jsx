import React,{useState} from "react";
import "./Loginregister.css";
import axios from "axios";

import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/slices/authSlice";

const Register = () => {

    const dispatch = useDispatch();

    const [User, setUser] = useState({
        name:"",
        email:"",
        pwd:""
    })

    const valuehandle = e =>{
        const {name,value} = e.target
        setUser({
            ...User,
            [name]: value
        })
    }
    const registerclick = () =>{
        const{ name, email, pwd} = User
        if(name && email && pwd){
            dispatch(registerAction({name, email, pwd}));
        }else{
            alert("Enter valid Value");
        }
    }
    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="form">
                        <div className="right-side">
                                
                                <div className="forms">
                                    <h1 className="forms-heading">Register</h1>
                                    <div className="form-inputs">
                                        <i className="fa fa-user"></i>
                                        <input type="text" placeholder="User name" name="name" value={User.name} onChange={valuehandle} required />
                                    </div>
                                    <div className="form-inputs">
                                        <i className="fa fa-envelope"></i>
                                        <input type="email" placeholder="Email"  name="email" value={User.email} onChange={valuehandle} required />
                                    </div>
                                    <div className="form-inputs">
                                        <i className="fa fa-eye" id="password_eye"></i>
                                        <input
                                            className="password-input" type="password" placeholder="Password" name="pwd" value={User.pwd} onChange={ valuehandle } required />
                                    </div>

                                    <div className="submit-button">
                                        <input type="submit" value="Register" onClick={registerclick} />
                                    </div>
                                    <div className="form-acc">
                                        <p>Already have account?</p><Link component={Login}>Login now</Link>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;
