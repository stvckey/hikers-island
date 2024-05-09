import React , {useState, useEffect} from 'react'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import httpClient from '../httpClient';
import { User } from "../types";

const LandingPage: React.FC = () => {
    const [user,setUser] = useState<User | null>(null);

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        window.location.href = "/";
    }

    useEffect(() => {
        (async() => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me");
                setUser(resp.data);
            } catch (error) {
                console.log("Not Authenticated")
            }
        })();
    }, []);
    return (
        <div className='login-singup-container  rounded-3'>
            
            <h1 className='login-singup-header'>
                HikeU
                <div className='underline'></div>
            </h1>

            {user != null ? (
                <div className='login-singup'>
                    <h1>You're logged in {user.username}</h1>

                    
                    <button onClick={logoutUser}>Log out</button>
                    
                </div>
            ) : (

                <div className='login-singup'>
                    <h3>You are NOT logged in</h3>
                    <div>
                        <a href='/login'>
                            <button className='btn btn-md rounded-pill'>Log in</button>
                        </a>
                        <a href='/signup'>
                            <button className='btn btn-md rounded-pill'>Register</button>
                        </a>
                    </div>
                </div>)}
        </div>
    )
}

export default LandingPage