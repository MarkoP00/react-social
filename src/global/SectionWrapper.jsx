import React from "react";
import { useState } from "react";
export default function SectionWrapper({ children, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <section
      onClick={handleClose}
      className={`fixed top-0 min-h-full w-full bg-gradient-to-r  bg-black/40 flex justify-center items-center z-[61]`}>
      <main className={`p-4 ${isClosing ? "popup-close" : "popup-open"}`}>
        {children}
      </main>
    </section>
  );
}
