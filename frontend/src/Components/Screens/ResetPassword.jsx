import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !cpassword) {
      toast.error("New password and confirm password are required");
      return;
    }
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await fetch(`http://localhost:5000/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, cpassword }),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success("Password reset successful");
      navigate("/login");
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-form">
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            onChange={(e) => setCPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};



export default ResetPassword;
