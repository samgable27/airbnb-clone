import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Place from "../components/Place";
import { differenceInCalendarDays, format } from "date-fns";

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
            <div
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={i}
            >
              <div className="w-48">
                <Place place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-2xl font-bold">{booking.place.title}</h2>
                <div className="flex items-center gap-2 border-t border-gray-300 mt-2 py-2 font-lato">
                  <div className="flex gap-1 items-center">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-bold">
                      {format(new Date(booking.checkIn), "yyy-MM-dd")}
                    </span>
                    through
                  </div>
                  <div className="flex gap-1 items-center">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-bold">
                      {format(new Date(booking.checkOut), "yyy-MM-dd")}
                    </span>
                  </div>
                </div>
                <div className="text-lg">
                  <div className="flex gap-1 ">
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span className="font-bold">
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{" "}
                      Nights
                    </span>
                  </div>
                  <div className="flex gap-1 items-center text-xl">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Total price:{" "}
                    <span className="font-bold">${booking.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
