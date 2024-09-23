import React from "react";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import FormField from "../../global/FormField";
import Warning from "../../global/WarrningText";
import validateForm from "../../services/form/validateInputs";
import fetchService from "../../services/fetchService";
import SectionWrapper from "../../global/SectionWrapper";
import GlobalLoader from "../../global/GlobalLoader";

export default function UpdatePost({ postData, onClose }) {
  const [formData, setFormData] = useState({
    title: {
      value: postData.title,
      invalid: false,
      message: "",
    },
    description: {
      value: postData.description,
      invalid: false,
      message: "",
    },
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const { formIsInvalid, updatedFormData } = validateForm(formData);

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

  async function submitForm() {
    setFormData(updatedFormData);
    setIsSubmiting(true);

    if (formIsInvalid) {
      setIsSubmiting(false);
      return;
    }

    if (
      postData.title === formData.title.value &&
      postData.description === formData.description.value
    ) {
      setIsSubmiting(false);
      setFormData((prevState) => ({
        ...prevState,
        title: {
          ...prevState.title,
          message: "Make changes to submit!",
        },
        description: {
          ...prevState.description,
          message: "Make changes to submit!",
        },
      }));
      return;
    }

    const body = {
      title: formData.title.value,
      description: formData.description.value,
      images: postData.images,
    };
    try {
      const resposne = await fetchService.patch(
        `/social_media/posts/${postData.id}`,
        body
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <>
      {isSubmiting && <GlobalLoader></GlobalLoader>}
      <SectionWrapper onClose={() => onClose(null)}>
        <form
          onClick={(e) => e.stopPropagation()}
          action=""
          className="space-y-6 relative bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full shadow-main-shadow max-msm:space-y-2 max-msm:p-4">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 max-ssm:text-xl">
              Update Post
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center max-ssm:gap-1">
            {postData.images && postData.images.length > 0 ? (
              postData.images.map((element, index) => (
                <img
                  key={element}
                  src={element}
                  alt={`User Post Image number ${index}`}
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <Warning
            span={"Warning"}
            text={
              "Please change fields which you want to be updated"
            }></Warning>
          <FormField
            labelText={"Current Post Title"}
            inputType={"text"}
            inputFor={"title"}
            inputValue={formData.title.value}
            invalid={formData.title.invalid}
            invalidMessage={formData.title.message}
            onReset={() => resetInput("title")}
            onEvent={(value) => handleFormDetails(value, "title")}></FormField>
          <FormField
            labelText={"Current Post Description"}
            inputType={"text"}
            inputFor={"description"}
            inputValue={formData.description.value}
            invalid={formData.description.invalid}
            invalidMessage={formData.description.message}
            onReset={() => resetInput("description")}
            onEvent={(value) =>
              handleFormDetails(value, "description")
            }></FormField>

          <div className="text-center">
            <button
              onClick={submitForm}
              type="button"
              className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg w-full max-ssm:px-2 max-ssm:py-2">
              Submit
            </button>
          </div>
          <div
            onClick={() => onClose(null)}
            className="absolute right-2 top-0 text-indigo-600 hover:bg-indigo-300 duration-200 font-semibold cursor-pointer bg-indigo-200 p-2 rounded-lg">
            <FaXmark size={20}></FaXmark>
          </div>
        </form>
      </SectionWrapper>
    </>
  );
}
