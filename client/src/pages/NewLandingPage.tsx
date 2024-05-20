import React, { useEffect } from 'react';
import '../landing.css';

const NewLandingPage = () => {
    useEffect(() => {
      const container = document.getElementById('container');
      const registerBtn = document.getElementById('register');
      const loginBtn = document.getElementById('login');
  
      if (container !== null && registerBtn !== null) {
        registerBtn.addEventListener('click', () => {
          container.classList.add("active");
          container.classList.remove("hidden");
        });
      } else {
        console.error("Container or registerBtn is null.");
      }
  
      if (container !== null && loginBtn !== null) {
        loginBtn.addEventListener('click', () => {
          container.classList.remove("active");
        });
      } else {
        console.error("Container or loginBtn is null.");
      }
    }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div>

        <div className='container' id='container'>
            <div className='form-container sign-up'>
                <form>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className='form-container sign-in'>
                <form>
                    <h1>Sign In</h1>
                    <input type="text" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button>Sign In</button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className='toggle-panel toggle-left'>
                        <h1>Welcome Back</h1>
                        <p>Enter your credentials to sign in!</p>
                        <button className='hidden' id='login'>Sign In</button>
                    </div>
                    <div className='toggle-panel toggle-right'>
                        <h1>Hello, Friend!</h1>
                        <p>Register to enter the site!!</p>
                        <button className='hidden' id='register'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default NewLandingPage