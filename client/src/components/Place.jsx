import React from "react";
import Image from "./Image";

const Place = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover rounded-md";
  }
  return <Image className={className} src={place.photos[index]} />;
};

export default Place;
