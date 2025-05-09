import React, { useState } from "react";
import Login_svg from "../../assets/Login-amico.svg";
import blog_svg from "../../assets/blobanimation.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const history1 = useNavigate();

  // For storing the data to send to the backend.
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); // For storing error messages

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Validation function
  const validate = () => {
    let formErrors = {};
    let isValid = true;

    // Username validation
    if (!user.userName) {
      formErrors.userName = "Username is required";
      isValid = false;
    } else if (user.userName.length < 3) {
      formErrors.userName = "Username should be at least 3 characters";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!user.userEmail) {
      formErrors.userEmail = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(user.userEmail)) {
      formErrors.userEmail = "Enter a valid userEmail address";
      isValid = false;
    }

    // Password validation
    if (!user.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      formErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }

    // Confirm password validation
    if (!user.cpassword) {
      formErrors.cpassword = "Confirm password is required";
      isValid = false;
    } else if (user.cpassword !== user.password) {
      formErrors.cpassword = "Passwords do not match";
      isValid = false;
    }

    // Role validation
    if (!user.role) {
      formErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Function to handle form submission
  const PostData = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { userName, userEmail, password, cpassword, role } = user;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, userEmail, password, cpassword, role }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      toast.error("Please Fill The Details.");
    } else if (res.status === 421) {
      toast.error("Email is Already Registered");
    } else if (res.status === 420) {
      toast.error("Password is not Matching");
    } else {
      toast.success("Register Successfully");
      history1("/login");
    }
  };

  const width2 = window.outerWidth;

  return (
    <>
      <div className="smallScreen">
        <mark>
          The Screen is Visible with width more than 250px
          <br />
          <br />
          <hr />
          <br />
          Screen Size: {width2}px
        </mark>
      </div>
      <div className="registerMainComponent">
        <img className="blob_svg blob_a" src={blog_svg} alt="backgound-svg" />
        <img className="blob_svg2 blob_a" src={blog_svg} alt="backgound-svg" />
        <h1 className="registerTitle title">Registration</h1>
        <br />
        <div className="registerSection">
          <div className="registerForm">
            <form>
              <div className="RegisterInputField">
                <div className="Registername">
                  <label className="registerLabels" htmlFor="userName">
                    Username:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="CodeSync"
                    value={user.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && (
                    <p className="errorlabelinput">{errors.userName}</p>
                  )}
                </div>
                <div className="Registeremail">
                  <label className="registerLabels" htmlFor="userEmail">
                    Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    placeholder="CodeSync@gmail.com"
                    value={user.userEmail}
                    onChange={handleChange}
                  />
                  {errors.userEmail && (
                    <p className="errorlabelinput">{errors.userEmail}</p>
                  )}
                </div>
                <div className="Registerpassword">
                  <label className="registerLabels" htmlFor="password">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="123456"
                    value={user.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="errorlabelinput">{errors.password}</p>
                  )}
                </div>
                <div className="Registercpassword">
                  <label className="registerLabels" htmlFor="cpassword">
                    Confirm Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="123456"
                    value={user.cpassword}
                    onChange={handleChange}
                  />
                  {errors.cpassword && (
                    <p className="errorlabelinput">{errors.cpassword}</p>
                  )}
                </div>
                <div className="Registerdomain">
                  <label className="registerLabels" htmlFor="role">
                    Profession:
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Web Developer"
                    value={user.role}
                    onChange={handleChange}
                  />
                  {errors.role && (
                    <p className="errorlabelinput">{errors.role}</p>
                  )}
                </div>
              </div>
              <input
                type="submit"
                onClick={PostData}
                className="btn registerbtn"
              />
            </form>
          </div>
          <div className="registerSVG">
            <img src={Login_svg} alt="" />
            <p>
              Already have an Account?{" "}
              <NavLink to="/login">
                <span className="registerSwitch">Login Now</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
