import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setaddress] = useState("");
  const [addPhotos, setAddPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const inputHeader = (text) => {
    return <h2 className="font-lato font-bold text-2xl mt-4">{text}</h2>;
  };

  const inputDesc = (text) => {
    return <p className="font-lato font-light text-gray-400">{text}</p>;
  };

  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();

    await axios.post("/places", {
      title,
      address,
      addPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place, be creative!")}
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="hover:border-primary"
          placeholder="for example: My lovely apt"
        />
        {preInput("Address", "Address to your newly created place")}
        <Input
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="hover:border-primary"
          placeholder="address"
        />
        {preInput("Photos", "The more, the better!")}
        <PhotoUploader addPhotos={addPhotos} onChange={setAddPhotos} />
        {preInput("Description", "Add a description to your place")}
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md"
          showCount
          maxLength={100}
        />
        {preInput("Perks", "Select all the perks for your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "House rules, etc.")}
        <TextArea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="rounded-md"
          showCount
          maxLength={100}
        />
        {preInput(
          "Check-in & Check-out",
          "Please remember to add a time window for cleaning the room between guests"
        )}
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="font-lato font-bold mt-2 -mb-1">Check-in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="2:00pm"
            />
          </div>
          <div>
            <h3 className="font-lato font-bold mt-2 -mb-1">Check-out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="11:00am"
            />
          </div>
          <div>
            <h3 className="font-lato font-bold mt-2 -mb-1">Max Guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
