import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login_svg from "../../assets/Back-to-work-pana.png";
import blog_svg from "../../assets/blobanimation.svg";
import { toast } from "react-hot-toast";
import { UsedContext } from "../App";

function Login() {
  const { dispatch } = useContext(UsedContext);
  const history2 = useNavigate();
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Function to validate form
  const validate = () => {
    let formErrors = {};

    if (!userEmail) {
      formErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      formErrors.userEmail = "Email format is invalid";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password should be at least 6 characters";
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  // Function to handle form submission
  const loginUser = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Please Enter Valid Inputs");
    } else if (res.status === 401) {
      toast.error("First Register Yourself");
    } else if (res.status === 402) {
      toast.error("Wrong Password");
    } else if (res.status === 403) {
      toast.error("Please Fill The Details");
    } else {
      dispatch({ type: "USER", payload: true });
      localStorage.setItem("token", data.token);
      toast.success("Login Successfully");
      history2("/");
    }
  };

  return (
    <>
      <div className="smallScreen">
        <mark>
          The Screen is Visible with width more than 250px <br />
          <br />
          <hr />
          <br />
          Screen Size: {window.outerWidth}px
        </mark>
      </div>
      <div className="loginContainer">
        <img className="blob_svg blob_a" src={blog_svg} alt="background-svg" />
        <img className="blob_svg2 blob_a" src={blog_svg} alt="background-svg" />
        <div className="registerSVG loginimage">
          <img src={Login_svg} alt="" />
          <p>
            Don't have an Account?{" "}
            <NavLink to="/register">
              <span className="registerSwitch">Create Account</span>
            </NavLink>
          </p>
        </div>
        <div className="loginDetails">
          <h1 className="title logintitle">Login</h1>
          <form className="LoginForm" onSubmit={loginUser}>
            <div className="Loginname">
              <label htmlFor="userEmail">Email:</label>
              <br />
              <input
                type="userEmail"
                name="userEmail"
                id="userEmail"
                autoComplete="off"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.userEmail && (
                <p className="errorlabelinput">{errors.userEmail}</p>
              )}
            </div>
            <div className="Loginname">
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="errorlabelinput">{errors.password}</p>
              )}
            </div>

              <div className="forgot-password">
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </div>
           

            <input type="submit" name="submit" id="submit" className="btn" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
