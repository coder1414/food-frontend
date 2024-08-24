import axios from "axios";
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // on change handler

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      console.log("API Response:", response.data); // Log the full response

      if (response.data.success) {
        if (response.data.token) {
          console.log("Token received:", response.data.token); // Log the token received
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          console.log("Token not received in sign-up response."); // Handle missing token
        }
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // for login

  // const onLogin = async (event) => {
  //   event.preventDefault();
  //   let newUrl = url;
  //   if (currState === "Login") {
  //     newUrl += "/api/user/login";
  //   } else {
  //     newUrl += "/api/user/register";
  //   }

  //   try {
  //     const response = await axios.post(newUrl, data);
  //     console.log(response.data); // Check the response data

  //     if (response.data.success) {
  //       setToken(response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //       setShowLogin(false);
  //     } else {
  //       alert(response.data.message); // Handle unsuccessful response
  //     }
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //     alert("An error occurred. Please try again."); // Handle errors gracefully
  //   }
  // };
  //--------------------------------

  // useEffect(() => {
  //   if (token) {
  //     console.log("Token has been generated:", token);
  //   } else {
  //     console.log("Token is not generated yet.");
  //   }
  // }, [token]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>by contunuing , i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            create a new account?
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
