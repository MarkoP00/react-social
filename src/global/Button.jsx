import React from "react";

export default function GlobalButton({ buttonText, onEvent }) {
  return (
    <button
      type="button"
      className="w-full px-4 py-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition duration-300"
      onClick={onEvent}
    >
      {buttonText}
    </button>
  );
}
