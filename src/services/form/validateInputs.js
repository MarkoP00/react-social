export default function validateForm(formData) {
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

  return { formIsInvalid, updatedFormData };
}
