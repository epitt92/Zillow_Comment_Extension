import axios from 'axios';
import React,{useState} from 'react';
import "./Loginregister.css";

import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

import Register from './Register';
import Homepage from './Homepage';
import Popup from '../Popup';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/slices/authSlice';
  
const Login = () =>{
    
	const dispatch = useDispatch();

    const [User, setUser] = useState({
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

    const handleloginclick = () =>{
        const { email, pwd } = User
        if(email && pwd){
          dispatch( loginAction( {email, pwd} ) )
        } else {
					alert("Enter Valid Value");
        }
    }
    
    return(
        <>
            <div className="section">
                <div className="container">
                    <div className="form">
                        <div className="right-side">
                                
                                <div className="forms">
                                    <h1 className="forms-heading">Login</h1>
                                
                                    <div className="form-inputs">
                                        <input type="email" placeholder="Email"  name="email" value={User.email} onChange={valuehandle} required />
                                    </div>
                                    <div className="form-inputs">
                                        <input
                                            className="password-input" type="password" placeholder="Password" name="pwd" value={User.pwd} onChange={ valuehandle } required />
                                    </div>

                                    <div className="submit-button">
                                        <input type="submit" value="login" onClick={handleloginclick} />
                                    </div>
                                    <div className="form-acc">
                                        <p>Don't have account?</p><Link component={Register}>Create account</Link>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default Login;