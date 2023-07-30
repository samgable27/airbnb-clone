import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div className="font-lato font-regular">
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, i) => (
              <div key={i}>
                <img src={`http://localhost:4000/uploads/${photo}`} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="font-lato font-regular mt-4  mx-32 pt-4">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        href={`https://maps.google.com/?q=${place.address}`}
        className="my-3 font-bold underline flex gap-1"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 items-center absolute bottom-2 right-2 py-2 px-4 font-lato font-light bg-white rounded-2xl shadow-md shadow-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>

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
