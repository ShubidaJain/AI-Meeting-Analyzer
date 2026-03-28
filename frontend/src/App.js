import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : isLogin ? (
        <Login setIsLoggedIn={setIsLoggedIn} setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;