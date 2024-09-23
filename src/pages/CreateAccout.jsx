import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo-transparent-short.png";
import FormField from "../global/FormField";
import GlobalButton from "../global/Button.jsx";
import Footer from "../global/Footer.jsx";

import fetchService from "../services/fetchService.js";
import validateFormFields from "../services/form/validateWithPasswords.js";
import GlobalPopup from "../global/GlobalPopup.jsx";
import GlobalLoader from "../global/GlobalLoader.jsx";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState();

  const [popupData, setPopupData] = useState({
    title: "",
    message: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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

  const [formData, setFormData] = useState({
    username: { value: "", invalid: false, message: "" },
    email: { value: "", invalid: false, message: "" },
    password: { value: "", invalid: false, message: "" },
    confirm: { value: "", invalid: false, message: "" },
  });

  const handleFormDetails = (value, element) => {
    setFormData((prevState) => ({
      ...prevState,
      [element]: {
        ...prevState[element],
        value: value,
      },
    }));
  };

  async function submitForm() {
    const { formIsInvalid, updatedFormData } = validateFormFields(formData);

    setFormData(updatedFormData);

    setIsSubmiting(true);

    if (formIsInvalid) {
      setIsSubmiting(false);
      return;
    }
    const body = {
      username: formData.username.value,
      email: formData.email.value,
      password: formData.password.value,
      profile_picture:
        "https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png",
    };
    try {
      const response = await fetchService.post("/social_media/users", body);

      if (response) {
        setPopupData({
          title: "Profile succesfully created!",
          message: "You can now Login to your account",
        });
      }
    } catch (error) {
      setPopupData({
        title: "Something went wrong...",
        message: "Please try again later!",
      });
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <>
      {popupData.title && (
        <GlobalPopup
          title={popupData.title}
          message={popupData.message}
          defaultPopup={true}
          onClose={() =>
            setPopupData({ title: "", message: "" })
          }></GlobalPopup>
      )}
      {isSubmiting && <GlobalLoader></GlobalLoader>}

      <section className="flex flex-col min-h-screen justify-center items-center bg-gray-50 gap-10 max-msm:gap-6">
        <div className="sectionTop text-center ">
          <div className="flex justify-center items-center ">
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 mx-auto max-msm:h-24 max-msm:w-24"
            />
            <h1
              className="text-5xl font-bold text-indigo-600 
           pointer-events-none ml-4 max-msm:text-2xl">
              VibeChimp
            </h1>
          </div>
        </div>

        <form className="main-content bg-white py-8 px-10 rounded-lg shadow-main-shadow w-96 max-msm:py-4 max-msm:w-[350px] max-vsm:w-[300px]">
          <div className="content-header mb-6 text-center">
            <h3 className="text-3xl font-bold text-indigo-600 pointer-events-none max-msm:text-2xl ">
              Create Account
            </h3>
          </div>
          <FormField
            labelText={"Username"}
            inputType={"text"}
            inputFor={"username"}
            inputValue={formData.username.value}
            invalid={formData.username.invalid}
            invalidMessage={formData.username.message}
            onReset={() => resetInput("username")}
            onEvent={(value) =>
              handleFormDetails(value, "username")
            }></FormField>

          <FormField
            labelText={"Email"}
            inputType={"email"}
            inputFor={"email"}
            invalid={formData.email.invalid}
            inputValue={formData.email.value}
            invalidMessage={formData.email.message}
            onReset={() => resetInput("email")}
            onEvent={(value) => handleFormDetails(value, "email")}></FormField>

          <FormField
            labelText={"Password"}
            inputType={"password"}
            inputFor={"password"}
            inputValue={formData.password.value}
            invalid={formData.password.invalid}
            invalidMessage={formData.password.message}
            isPasswordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            onReset={() => resetInput("password")}
            onEvent={(value) =>
              handleFormDetails(value, "password")
            }></FormField>

          <FormField
            labelText={"Confirm password"}
            inputType={"password"}
            inputFor={"confirm"}
            inputValue={formData.confirm.value}
            isPasswordVisible={passwordVisible}
            invalid={formData.confirm.invalid}
            invalidMessage={formData.confirm.message}
            togglePasswordVisibility={togglePasswordVisibility}
            onReset={() => resetInput("confirm")}
            onEvent={(value) =>
              handleFormDetails(value, "confirm")
            }></FormField>

          <div className="form-button mb-6">
            <GlobalButton
              buttonText="Submit"
              onEvent={submitForm}></GlobalButton>
          </div>

          <div className="form-bottom flex justify-between items-center">
            <p className="text-gray-700">Have an Account?</p>
            <Link
              to="/login"
              className="text-textColors-100 font-[600]">
              Login instead
            </Link>
          </div>
        </form>
        <Footer></Footer>
      </section>
    </>
  );
}
