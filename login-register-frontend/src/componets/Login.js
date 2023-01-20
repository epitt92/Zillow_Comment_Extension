import React,{useState} from 'react';
import "./Loginregister.css";

import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () =>{
    
    const navigate = useNavigate();
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
        console.log(User);
        const { email, pwd } = User
        if(email && pwd){
            dispatch( loginAction( {email, pwd, navigate} ) )
        } else {
            alert("Enter email and password.")
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
                                    <i className="fa fa-envelope"></i>
                                    <input type="email" placeholder="Email"  name="email" value={User.email} onChange={valuehandle} required />
                                </div>
                                <div className="form-inputs">
                                    <i className="fa fa-eye" id="password_eye"></i>
                                    <input
                                        className="password-input" type="password" placeholder="Password" name="pwd" value={User.pwd} onChange={ valuehandle } required />
                                </div>

                                <div className="submit-button">
                                    <input type="submit" value="login" onClick={handleloginclick} />
                                </div>
                                <div className="form-acc">
                                    <p>Don't have account?</p><Link to="/register">Create account</Link>
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