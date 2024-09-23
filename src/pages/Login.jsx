import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo-transparent-short.png";
import FormField from "../global/FormField";
import GlobalButton from "../global/Button.jsx";
import Footer from "../global/Footer.jsx";
import validateForm from "../services/form/validateInputs.js";
import GlobalPopup from "../global/GlobalPopup.jsx";
import fetchService from "../services/fetchService.js";
import GlobalLoader from "../global/GlobalLoader.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [popupData, setPopupData] = useState({ title: "", message: "" });
  const [formData, setFormData] = useState({
    email: {
      value: "",
      invalid: false,
      message: "",
    },
    password: {
      value: "",
      invalid: false,
      message: "",
    },
  });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUserID");
    localStorage.removeItem("loggedUserEmail");
    localStorage.removeItem("loggedUserProfilePicture");
    localStorage.removeItem("loggedUsername");
  }, []);

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

  const submitForm = async () => {
    const { formIsInvalid, updatedFormData } = validateForm(formData);
    setFormData(updatedFormData);

    if (formIsInvalid) return;
    setIsSubmiting(true);

    const body = {
      email: formData.email.value,
      password: formData.password.value,
    };

    try {
      const response = await fetchService.post(
        "/social_media/users/login",
        body
      );

      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedUserID", response.data.user.id);
        localStorage.setItem("loggedUserEmail", formData.email.value);
        localStorage.setItem(
          "loggedUserProfilePicture",
          response.data.user.profile_picture
        );
        localStorage.setItem("loggedUsername", response.data.user.username);
        navigate("/mainPage");
      }
    } catch (error) {
      setPopupData({
        title: "Something went wrong...",
        message: "Please try again later!",
      });
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <>
      {popupData.title && (
        <GlobalPopup
          title={popupData.title}
          message={popupData.message}
          defaultPopup={true}
          onClose={() => setPopupData({ title: "", message: "" })}
        />
      )}
      {isSubmiting && <GlobalLoader></GlobalLoader>}

      <section className="flex flex-col min-h-screen justify-center items-center bg-gray-50 gap-10 max-msm:gap-6">
        <div className="sectionTop text-center mb-6">
          <div className="flex justify-center items-center ">
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 mx-auto max-msm:h-24 max-msm:w-24"
            />
            <h1 className="text-5xl font-bold text-indigo-600 pointer-events-none ml-4 max-msm:text-2xl">
              VibeChimp
            </h1>
          </div>
        </div>
        <form className="main-content bg-white py-8 px-10 rounded-lg shadow-main-shadow w-96 max-msm:py-4 max-msm:w-[350px] mb-10">
          <div className="content-header mb-4 text-center">
            <h3 className="text-3xl font-bold text-indigo-600 pointer-events-none max-msm:text-2xl">
              Login
            </h3>
          </div>
          <FormField
            labelText={"Email"}
            inputType={"email"}
            inputFor={"email"}
            inputValue={formData.email.value}
            invalid={formData.email.invalid}
            invalidMessage={formData.email.message}
            onReset={() => resetInput("email")}
            onEvent={(value) => handleFormDetails(value, "email")}
          />
          <FormField
            labelText={"Password"}
            inputType={"password"}
            inputFor={"password"}
            inputValue={formData.password.value}
            isPasswordVisible={passwordVisible}
            invalid={formData.password.invalid}
            invalidMessage={formData.password.message}
            togglePasswordVisibility={togglePasswordVisibility}
            onReset={() => resetInput("password")}
            onEvent={(value) => handleFormDetails(value, "password")}
          />
          <div className="form-button mb-6">
            <GlobalButton
              buttonText="Submit"
              onEvent={submitForm}
            />
          </div>
          <div className="form-bottom flex justify-between items-center">
            <p className="text-gray-700">Not a Member?</p>
            <Link
              to="/create"
              className="text-textColors-100 font-[600]">
              Create account
            </Link>
          </div>
        </form>
        <Footer />
      </section>
    </>
  );
}
