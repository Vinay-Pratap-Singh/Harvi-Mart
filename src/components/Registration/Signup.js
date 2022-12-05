import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, cSetPassword] = useState("");

  const createAccount = async (event) => {
    event.preventDefault();

    try {
      if (!name || !email || !password || !cPassword) {
        alert("Fill all the fields");
      } else if (password !== cPassword) {
        alert("Password Mismatch");
      } else {
        const res = await axios.post("/api/auth/signup", {
          email,
          password,
          name
        });
        console.log(res.data);
      }
    } catch (error) {
      console.log("Failed to save user",error);
    }
  };
  return (
    <div>
      <form onSubmit={createAccount} className="w-96 bg-gray-100 p-4">
        {/* user name */}
        <div className="flex flex-col relative my-4 moveText">
          <input
            className=" bg-gray-300 p-2"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label className="absolute top-2 left-2">Name</label>
        </div>

        {/* user email */}
        <div className="flex flex-col relative my-4 moveText">
          <input
            className=" bg-gray-300 p-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="absolute top-2 left-2">Email</label>
        </div>

        {/* password */}
        <div className="flex flex-col relative my-4 moveText">
          <input
            className=" bg-gray-300 p-2"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="absolute top-2 left-2">Password</label>
        </div>

        {/* confirm password */}
        <div className="flex flex-col relative my-4 moveText">
          <input
            className=" bg-gray-300 p-2"
            type="text"
            value={cPassword}
            onChange={(event) => cSetPassword(event.target.value)}
          />
          <label className="absolute top-2 left-2">confirm Password</label>
        </div>

        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
