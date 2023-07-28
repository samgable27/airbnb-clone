import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";

const Places = () => {
  const [places, setplaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setplaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 font-lato font-regular bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, i) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 p-2 rounded-2xl flex gap-4 cursor-pointer"
            >
              <div key={i} className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos?.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-lato font-regular">
                  {place.title}
                </h2>
                <p className="text-sm mt-2 font-lato font-light">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Places;
