import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const RegistrationPage = () => {
  // showing and hiding the login and create account
  const [flag, setFlag] = useState(true);
  const showHideCard = (event) => {
    if (event.target.innerText === "Log in") setFlag(true);
    else if (event.target.innerText === "Sign up") setFlag(false);
  };

  return (
    <div>
      {/* creating log in and signup buttons to switch the card */}
      <div>
        <button onClick={showHideCard}>Log in</button>
        <button onClick={showHideCard}>Sign up</button>
      </div>
      
      {/* showing the login card if flag is true */}
      {flag && <Login />}
      {/* showing the create account card if flag is false */}
      {!flag && <Signup />}
    </div>
  );
};

export default RegistrationPage;
