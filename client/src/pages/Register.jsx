import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login to continue.");
    } catch (e) {
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="font-lato font-regular text-4xl text-center mb-4">
          Register
        </h1>
        <form
          className="font-lato font-light max-w-md mx-auto space-y-4"
          onSubmit={registerUser}
        >
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary font-lato font-bold">Register</button>
          <div className="font-lato font-regular text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
