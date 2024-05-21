import React, {useState} from 'react'
import httpClient from '../httpClient';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () => {
        console.log(email, password);
        
        try{
            const resp = await httpClient.post("//localhost:5000/login", {
            email,
            password,
        });
        
        window.location.href = "/Home";
        } catch (error: any) {
            if (error.response.status === 401) {
                alert("Invalid credentials homie");
            }
        }
    };
    

    return (
        <div className='login-singup-container rounded-3'>
            <h1>Login Brother</h1>
            <form className='inputs'>

                <div className='input'>
                    <img src={require('../Components/Assets/email.png')}></img>
                    
                    <input 
                    placeholder='Email'
                    type='text' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} id=""
                    />
                </div>

                <div className='input'>
                    <img src={require('../Components/Assets/password.png')}></img>
                    
                    <input 
                    placeholder='password'
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} id=""
                    />
                </div>

                    <button className='btn btn-md rounded-pill' type="button" onClick={() => logInUser()}>
                        Submit
                    </button>

                    <a href="/SignUp" className='btn btn-md rounded-pill'>
                            Don't have an account?
                    </a>

                
            </form>
        </div>
    )
}

export default LoginPage