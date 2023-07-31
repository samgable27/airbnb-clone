import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Place from "../components/Place";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="font-lato">
      <AccountNav />
      <div className="space-y-4">
        {bookings?.length > 0 &&
          bookings.map((booking, i) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={i}
            >
              <div className="w-48">
                <Place place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-2xl font-bold">{booking.place.title}</h2>
                <BookingDates booking={booking} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
