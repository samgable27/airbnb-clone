import axios from "axios";
import { set } from "mongoose";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful! Welcome to the app.");

      setRedirect(true);
    } catch (e) {
      alert("Login failed! Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="font-lato font-regular text-4xl text-center mb-4">
          Login
        </h1>
        <form
          className="font-lato font-light max-w-md mx-auto space-y-4"
          onSubmit={loginUser}
        >
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
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="primary font-lato font-bold">Login</button>
          <div className="font-lato font-regular text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
