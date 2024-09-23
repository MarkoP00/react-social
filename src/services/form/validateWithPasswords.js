export default function validateFormFields(formData) {
  let formIsInvalid = false;

  const updatedFormData = { ...formData };

  Object.keys(updatedFormData).forEach((key) => {
    const { value } = updatedFormData[key];

    updatedFormData[key].invalid = false;
    updatedFormData[key].message = "";

    if (!value || value.length < 5) {
      updatedFormData[key].invalid = true;
      updatedFormData[key].message = "Please, enter at least 5 chars!";
      formIsInvalid = true;
    }

    if (key === "email" && !value.includes("@")) {
      updatedFormData[key].invalid = true;
      updatedFormData[key].message = "Please, check your email address!";
      formIsInvalid = true;
    }
  });

  if (updatedFormData.password.value !== updatedFormData.confirm.value) {
    updatedFormData.password.invalid = true;
    updatedFormData.confirm.invalid = true;

    updatedFormData.password.message = "Passwords must match!";
    updatedFormData.confirm.message = "Passwords must match!";

    formIsInvalid = true;
  }

  return { formIsInvalid, updatedFormData };
}
