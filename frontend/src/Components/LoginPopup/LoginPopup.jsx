import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handle form input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
  
    try {
      console.log("Sending request to:", newUrl);
      console.log("Request data:", data);
      
      const response = await axios.post(newUrl, data);
      console.log("Response received:", response);
  
      if (response.data.success) {
        setToken(response.data.token); // Ensure the response contains 'token'
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login or registration:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  // Toggle between Login and Sign Up states
  const handleStateChange = () => {
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2> {/* Title based on current state */}
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your Name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        <p>
          {currState === "Login"
            ? <>Create a new account? <span onClick={handleStateChange}>Click here</span></>
            : <>Already have an account? <span onClick={handleStateChange}>Login here</span></>
          }
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
