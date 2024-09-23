import React from "react";

export default function GlobalLoader() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/30 z-[70]">
      <img src="/loading-spinner.svg" alt="" className="w-64 h-64" />
    </div>
  );
}
