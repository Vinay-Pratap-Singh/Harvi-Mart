import React from "react";

const Signup = () => {
  return (
    <div>
      <form className="w-96 bg-gray-100 p-4">
        {/* user name */}
        <div className="flex flex-col relative my-4 moveText">
          <input className=" bg-gray-300 p-2" type="text" />
          <label className="absolute top-2 left-2" >
            Name
          </label>
        </div>

        {/* user email */}
        <div className="flex flex-col relative my-4 moveText">
          <input className=" bg-gray-300 p-2" type="text" />
          <label className="absolute top-2 left-2" >
            Email
          </label>
        </div>

        {/* password */}
        <div className="flex flex-col relative my-4 moveText">
          <input className=" bg-gray-300 p-2" type="text" />
          <label className="absolute top-2 left-2" >
            Password
          </label>
        </div>

        {/* confirm password */}
        <div className="flex flex-col relative my-4 moveText">
          <input className=" bg-gray-300 p-2" type="text" />
          <label className="absolute top-2 left-2" >
            confirm Password
          </label>
        </div>

        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
