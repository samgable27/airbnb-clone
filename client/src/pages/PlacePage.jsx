import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="font-lato font-regular mt-4  mx-32 pt-4">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] text-xl">
        <div className="">
          <div className="my-4">
            <h2 className="font-bold text-2xl">About this listing</h2>
            {place.description}
          </div>
          Check-in time: {place.checkIn}
          <br />
          Check-out time: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8">
        <div>
          <h2 className="font-bold text-xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-4 mb-4 mt-1">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
