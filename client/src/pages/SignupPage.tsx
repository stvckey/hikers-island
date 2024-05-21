import React, {useState} from 'react'
import httpClient from '../httpClient';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const signupUser = async () => {
        console.log(username, email, password);
        
        try {
            const resp = await httpClient.post("//localhost:5000/register", {
                email,
                username,
                password,
            });

            // Assuming the response indicates success
            window.location.href = "/";
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Alert the user for invalid credentials
                alert("Invalid credentials. Please try again.");
            } else {
                // Handle other errors (e.g., network issues, server errors)
                alert("An error occurred. Please try again later.");
            }
            // Stay on the signup page after an error
            // You can remove this line if you want to redirect to "/" after an error
            // window.location.href = "/signup";
        }
    };
    

    return (
        <div className='login-singup-container rounded-3'>
            <h1>Signup Brother</h1>
            <form className='inputs'>

                <div className='input'>
                    <img src={require('../Components/Assets/person.png')}></img>
                    
                    <input 
                    placeholder='Username'
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} id=""
                    />
                </div>

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

                    <button className='btn btn-md rounded-pill' type="button" onClick={() => signupUser()}>
                        Submit
                    </button>

                    <a href="/login" className='btn btn-md rounded-pill'>
                            Already have an account?
                    </a>

                
            </form>
        </div>
    )
}

export default SignupPage