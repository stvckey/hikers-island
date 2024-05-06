import React , {useState, useEffect} from 'react'
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
        <div>
            <h1>Welcome to the app mane!</h1>
            {user != null ? (
                <div>
                    <h1>You're logged in {user.username}</h1>

                    
                    <button onClick={logoutUser}>Log out</button>
                    
                </div>
            ) : (

                <div>
                    <h3>You are NOT logged in</h3>
                    <div>
                        <a href='/login'>
                            <button>Log in</button>
                        </a>
                        <a href='/register'>
                            <button>Register</button>
                        </a>
                    </div>
                </div>)}
        </div>
    )
}

export default LandingPage