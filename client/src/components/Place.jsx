import React from "react";

const Place = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover rounded-md";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
    />
  );
};

export default Place;
