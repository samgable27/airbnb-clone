import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";

const PhotoUploader = ({ addPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    onChange((prev) => {
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
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  return (
    <>
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
        {addPhotos?.length > 0 &&
          addPhotos.map((link, i) => (
            <div className="h-32 flex" key={i}>
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
    </>
  );
};

export default PhotoUploader;
