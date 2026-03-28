import React, { useState } from "react";

function Login({ setIsLoggedIn, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.msg) {
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
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
        <h2>🔐 Login</h2>

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
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#3b82f6", cursor: "pointer" }}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </span>
      </p>
      </div>
    </div>
  );
}

export default Login;