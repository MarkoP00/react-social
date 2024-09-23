import React from "react";

export default function Warning({ span, text }) {
  return (
    <div className="flex items-start border-l-4 border-blue-500 bg-blue-100/90 p-4 rounded-br-lg rounded-tr-lg shadow-md">
      <div className="mr-3 max-ssm:mr-1 ">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold ">{span}:</h3>
        <p className=" mt-1">{text}</p>
      </div>
    </div>
  );
}
