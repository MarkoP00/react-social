import React from "react";
import loadingSpinner from "../assets/logo/loading-spinner.svg";
export default function GlobalLoader() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/30 z-[70]">
      <img
        src={loadingSpinner}
        alt=""
        className="w-64 h-64"
      />
    </div>
  );
}
