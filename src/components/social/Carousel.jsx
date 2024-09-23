import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function Carousel({
  children: slides,
  autoslide = false,
  autoslideInterval = 3000,
  postData,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoslide) return;
    const slideInterval = setInterval(next, autoslideInterval);
    return () => clearInterval(slideInterval);
  }, [autoslide, autoslideInterval, next]);

  //   swipe
  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="overflow-hidden relative w-full h-full cursor-grab active:cursor-grabbing"
      {...handlers}
    >
      <div
        className="flex transition-transform ease-out duration-500 min-h-[450px] max-h-[450px] "
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      {postData.images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {postData.images.length > 1 && (
        <div className="absolute bottom-4 w-full flex items-center justify-center gap-2 z-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 rounded-full ${
                curr === i ? "bg-indigo-500" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
