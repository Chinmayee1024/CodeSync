import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [userEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setMessage(data.message);
      toast.success("Reset link sent to your userEmail");
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  return (
<div className="forgot-container">
      <div className="forgot-content">
        <h2 className="forgot-title-outside">Forgot Password</h2>
        <div className="forgot-box">
          <form className="forgot-form" onSubmit={handleSubmit}>
            <label htmlFor="userEmail">Enter your email address:</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              placeholder="you@example.com"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};




export default ForgotPassword;
