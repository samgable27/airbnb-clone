import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numNights = 0;

  if (checkIn && checkOut) {
    numNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookPlace = async () => {
    const res = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numGuests,
      name,
      phone,
      place: place._id,
      price: numNights * place.price,
    });

    const bookingId = res.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-4 px-4">
            <label>Check-in:</label>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
            />
          </div>
          <div className="py-4 px-4 border-l">
            <label>Check-out:</label>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="date"
            />
          </div>
        </div>
      </div>
      <div className="py-4 px-4">
        <label>Number of guests:</label>
        <input
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          type="number"
        />
      </div>
      {numNights > 0 && (
        <div className="py-4 px-4">
          <label>Your full name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Phone number:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
        </div>
      )}
      <button onClick={bookPlace} className="primary mt-4">
        Book this place
        {numNights > 0 && <span> ${numNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
