import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "antd";
import Perks from "../components/Perks";
import axios from "axios";

const Places = () => {
  const { action } = useParams();
  const { TextArea } = Input;

  const [title, setTitle] = useState("");
  const [address, setaddress] = useState("");
  const [addPhotos, setAddPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    setAddPhotos((prev) => {
      return [...prev, fileName];
    });

    setPhotoLink("");
  };

  const uploadPhotoByFile = (e) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <Input
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                className="hover:border-primary"
                placeholder="Add using link (.jpg)"
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl"
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-3 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              {addPhotos.length > 0 &&
                addPhotos.map((link, i) => (
                  <div className="h-32" key={i}>
                    <img
                      className="rounded-2xl w-fullobject-cover"
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhotoByFile}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
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
                <h3 className="font-lato font-bold mt-2 -mb-1">
                  Check-in time
                </h3>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                  placeholder="2:00pm"
                />
              </div>
              <div>
                <h3 className="font-lato font-bold mt-2 -mb-1">
                  Check-out time
                </h3>
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
      )}
    </div>
  );
};

export default Places;
