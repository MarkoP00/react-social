import React from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";

export default function FormField({
  labelText,
  inputType,
  onEvent,
  inputFor,
  isPasswordVisible,
  inputValue,
  invalidMessage,
  invalid,
  togglePasswordVisibility,
  onReset,
  defaultInput,
}) {
  return (
    <div className="form-input mb-6">
      <label
        htmlFor={labelText}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          type={
            inputFor === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : inputFor === "confirm"
              ? isPasswordVisible
                ? "text"
                : "password"
              : inputType
          }
          id={labelText}
          value={inputValue}
          className={`w-full px-4 py-3 text-gray-800 bg-gray-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            invalid ? "border-red-600" : "border-gray-300"
          }`}
          onBlur={() => onReset(inputType)}
          onChange={(event) => onEvent(event.target.value)}
        />
        {!defaultInput && (
          <div className="absolute right-3 top-4 text-gray-600 text-xl">
            {inputFor === "username" && <FaUser />}

            {inputFor === "password" && (
              <span
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}

            {inputFor === "email" && <MdEmail />}

            {inputFor === "confirm" && (
              <span
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              >
                {isPasswordVisible ? <GiPadlockOpen /> : <GiPadlock />}
              </span>
            )}
          </div>
        )}

        {invalidMessage && (
          <p className="text-red-600 absolute">{invalidMessage}</p>
        )}
      </div>
    </div>
  );
}
