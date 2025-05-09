import React, { useState } from "react";
import blob from "../../assets/blobanimation.svg";
import { toast } from "react-hot-toast";

function Feedback() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // Validation Function
  const validate = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!userData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Invalid email address";
    }

    if (!userData.feedback.trim()) {
      errors.feedback = "Feedback is required";
    }

    return errors;
  };

  const submitData = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const loadingToast = toast.loading("Submitting...");
        const res = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (res.ok) {
          toast.dismiss(loadingToast);
          toast.success("Feedback Submitted Successfully!");
          setUserData({ name: "", email: "", feedback: "" });
        } else {
          toast.dismiss(loadingToast);
          toast.error("Server Error! Please try later.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Server Error! Please try later.");
      }
    } 
  };

  return (
    <>
      <div className="container">
        <img src={blob} alt="" className="blob_a blob3" />
        <h1 className="title">Let's Work Together</h1>
        <div className="feedSection">
          <div className="feedinfo">
            <p className="info">
              For Being <mark>Amazing</mark>. Let's Become a part of an amazing
              community <mark>CodeSync</mark>. You can even tell your{" "}
              <mark>Issues Related to Website for Improving the Site</mark>.
            </p>
          </div>
          <div className="feedform">
            <form onSubmit={submitData}>
              <div className="formname formDetails">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={postUserData}
                />
                {errors.name && <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>}
              </div>
              <div className="formemail formDetails">
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={postUserData}
                />
                {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
              </div>
              <div className="formmessage formDetails">
                <label>Message :</label>
                <textarea
                  name="feedback"
                  id="feedback"
                  value={userData.feedback}
                  onChange={postUserData}
                />
                {errors.feedback && (
                  <p style={{ color: "red", fontSize: "14px" }}>{errors.feedback}</p>
                )}
              </div>
              <div className="formbutton formDetails">
                <button type="submit" className="btn formbtn">
                  Say a Word?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
