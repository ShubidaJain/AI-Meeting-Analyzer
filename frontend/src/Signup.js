import React, { useState } from "react";

function Signup({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.msg) {
      alert("Signup successful! Please login.");
      setIsLogin(true);
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white"
    }}>
      <div style={{
        background: "#1e293b",
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h2>📝 Signup</h2>

        <input
          placeholder="Email"
          style={{ margin: "10px", padding: "10px", width: "200px" }}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          style={{ margin: "10px", padding: "10px", width: "200px" }}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button
          onClick={handleSignup}
          style={{
            padding: "10px 20px",
            background: "#22c55e",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Signup
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;