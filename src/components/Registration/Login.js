import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = async (event) => {
    event.preventDefault()
    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });
  }

  return (
    <form onSubmit={checkLogin} className="w-96 bg-gray-100 p-4">
      {/* email */}
      <div className="flex flex-col relative my-4 moveText">
        <input
          className=" bg-gray-300 p-2"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="absolute top-2 left-2" htmlFor="">
          Email
        </label>
      </div>

      {/* password */}
      <div className="flex flex-col relative my-4 moveText">
        <input
          className=" bg-gray-300 p-2"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className="absolute top-2 left-2" htmlFor="">
          Password
        </label>
      </div>

      <button>Log in</button>
    </form>
  );
};

export default Login;
