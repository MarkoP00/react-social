import React from "react";
import { useState, useRef } from "react";
import FormField from "../../../global/FormField";
import Warning from "../../../global/WarrningText";
import validateForm from "../../../services/form/validateInputs";
import fetchService from "../../../services/fetchService";
import GlobalPopup from "../../../global/GlobalPopup";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: {
      value: "",
      invalid: false,
      message: "",
    },
    description: {
      value: "",
      invalid: false,
      message: "",
    },
  });

  const [popupData, setPopupData] = useState({
    popupTitle: "",
    popupMessage: "",
  });

  const postImagesRef = useRef([]);

  const resetInput = (input) => {
    setFormData((prevState) => ({
      ...prevState,
      [input]: {
        ...prevState[input],
        invalid: false,
        message: "",
      },
    }));
  };

  const handleFormDetails = (value, element) => {
    setFormData((prevState) => ({
      ...prevState,
      [element]: {
        ...prevState[element],
        value: value,
      },
    }));
  };

  async function postData(body) {
    try {
      const response = await fetchService.post("/social_media/posts", body);

      if (response) {
        setPopupData({
          popupTitle: "Post Created!",
          popupMessage: "Check your new post on Home Page!",
        });
      }
    } catch (error) {
      console.error(error);
      setPopupData({
        popupTitle: "Something went wrong...",
        popupMessage: "Please try again!",
      });
    }
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloud_name: "djre34b8c",
      upload_preset: "react-social",
      api_key: "612221761856468",
    },
    (error, result) => {
      if (error) {
        console.error("Upload Widget Error:", error);
        setPopupData({
          popupTitle: "Something went wrong...",
          popupMessage: "Please try again!",
        });
        return;
      }
      if (result.event === "success") {
        postImagesRef.current.push(result.info.secure_url);
      } else if (result.event === "close") {
        const body = {
          title: formData.title.value,
          description: formData.description.value,
          images: postImagesRef.current,
        };
        postData(body);
        postImagesRef.current = [];
      }
    }
  );

  function openUploadWidget() {
    const { formIsInvalid, updatedFormData } = validateForm(formData);
    if (formIsInvalid) {
      setFormData(updatedFormData);
      return;
    }
    widget.open();
  }

  return (
    <>
      {popupData.popupTitle && (
        <GlobalPopup
          defaultPopup={true}
          title={popupData.popupTitle}
          message={popupData.popupMessage}
          onClose={() => setPopupData({ popupTitle: "", popupMessage: "" })}
        ></GlobalPopup>
      )}
      <section className="relative min-h-screen w-full flex justify-center items-center ">
        <main className="relative bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full shadow-main-shadow">
          <form action="" className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-gray-800">
                Create Post
              </h3>
            </div>

            <Warning
              span="Warning"
              text="Please, enter your post title and description, then select your images. After selecting images, your post will be created!"
            />

            <FormField
              labelText={"New Post Title"}
              inputType={"text"}
              inputFor={"title"}
              inputValue={formData.title.value}
              invalid={formData.title.invalid}
              invalidMessage={formData.title.message}
              onReset={() => resetInput("title")}
              onEvent={(value) => handleFormDetails(value, "title")}
            />

            <FormField
              labelText={"New Post Description"}
              inputType={"text"}
              inputFor={"description"}
              inputValue={formData.description.value}
              invalid={formData.description.invalid}
              invalidMessage={formData.description.message}
              onReset={() => resetInput("description")}
              onEvent={(value) => handleFormDetails(value, "description")}
            />

            <div className="text-center">
              <button
                type="button"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg"
                onClick={openUploadWidget}
              >
                Choose Photos
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
