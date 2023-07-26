import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  };

  //   if user is not ready
  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6";

    if (type === subpage) {
      classes += " bg-primary text-white rounded-full font-bold";
    }

    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full mt-8 flex justify-center space-x-2 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          <span className="font-lato">My Profile</span>
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          <span className="font-lato">My Bookings</span>
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          <span className="font-lato">My Accommodations</span>
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="font-lato text-center max-w-xl mx-auto">
          Logged in as{" "}
          <span className="font-bold">
            {user.name} ({user.email})
          </span>{" "}
          <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
