import React, { useRef, useState } from "react";
import Warning from "../../global/WarrningText";
import fetchService from "../../services/fetchService";
import SectionWrapper from "../../global/SectionWrapper";
import { FaXmark } from "react-icons/fa6";

export default function UpdateProfile({ userData, span, text, onClose }) {
  const usernameRef = useRef();
  const [profilePicture, setProfilePicture] = useState(
    userData.profile_picture
  );

  function handleUserName(value) {
    usernameRef.current = value;
  }

  async function postData(body) {
    const response = await fetchService.patch("/social_media/users", body);
    if (response.ok) {
      console.log(response);
    }
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloud_name: "djre34b8c",
      upload_preset: "react-social",
      api_key: "612221761856468",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        const uploadedImageUrl = result.info.secure_url;
        setProfilePicture(uploadedImageUrl);
        localStorage.setItem("loggedUserProfilePicture", uploadedImageUrl);
        const body = {
          profile_picture: result.info.secure_url,
          username: usernameRef.current
            ? usernameRef.current
            : userData.username,
        };
        postData(body);
      }
    }
  );

  function openUploadWidget() {
    widget.open();
  }
  return (
    <SectionWrapper onClose={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="space-y-6 relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full shadow-main-shadow max-ssm:space-y-2">
        <div className="flex justify-center py-4">
          <h3 className="text-3xl font-bold text-gray-900">Update Profile</h3>
        </div>
        <div className="userProfileImage flex justify-center">
          <img
            src={
              profilePicture ||
              "https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png"
            }
            alt="User Profile"
            className="h-32 w-32 rounded-full object-cover shadow-lg border-4 border-indigo-500"
          />
        </div>
        <div className="userNamePreview text-center mb-4">
          {usernameRef.current ? (
            <h3 className="text-2xl font-semibold text-gray-800">
              {usernameRef.current}
            </h3>
          ) : (
            <h3 className="text-2xl font-semibold text-gray-800">
              {userData.username}
            </h3>
          )}
        </div>

        <Warning
          span={span}
          text={text}
        />

        <div className="input flex flex-col space-y-4 mb-6">
          <label
            htmlFor="username"
            className="text-gray-700 font-medium">
            New Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Leave empty to keep the current / Enter new one "
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            defaultValue={userData.username}
            onChange={(e) => handleUserName(e.target.value)}
            autoComplete="off"
            maxLength="20"
            required
          />
        </div>

        <div className="flex justify-between gap-4 mb-6">
          <button
            type="button"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md cursor-pointer max-msm:px-2 max-msm:py-2"
            onClick={() =>
              postData({
                username: usernameRef.current,
                profile_picture: userData.profile_picture,
              })
            }>
            Change Username Only
          </button>
          <button
            type="button"
            onClick={openUploadWidget}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md max-msm:px-2 max-msm:py-2">
            Change Photo
          </button>
        </div>

        <div
          onClick={() => onClose()}
          className="absolute right-6 top-2 text-indigo-600 hover:bg-indigo-300 duration-200 font-semibold cursor-pointer bg-indigo-200 p-2 rounded-lg
          max-msm:right-3 max-msm:top-0">
          <FaXmark size={20}></FaXmark>
        </div>
      </form>
    </SectionWrapper>
  );
}
