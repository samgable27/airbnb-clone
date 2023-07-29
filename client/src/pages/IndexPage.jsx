import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, i) => (
          <Link to={`/place/${place._id}`} key={i}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="object-cover rounded-2xl aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h2 className="font-lato font-bold">{place.address}</h2>
            <h3 className="font-lato font-regular text-gray-500 leading-4">
              {place.title}
            </h3>
            <div className="font-lato font-regular mt-1">
              <span className="font-black">${place.price} per</span>
              <span className="font-regular"> night</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
