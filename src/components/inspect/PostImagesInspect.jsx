import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

export default function InspectPostImages({ images, closeEvent }) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <main
      onClick={() => closeEvent(null)}
      className=" min-h-full  w-full flex fixed top-0 left-0 justify-center items-center bg-black/60 z-[100] px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative popup-open overflow-hidden w-[650px] max-w-4xl h-[60vh] sm:h-[55vh] rounded-lg shadow-lg"
        {...handlers}>
        <div
          onClick={() => closeEvent(null)}
          className="flex transition-transform ease-out duration-700 h-full"
          style={{ transform: `translateX(-${curr * 100}%)` }}>
          {images.length === 1 && (
            <div
              key={images}
              className="w-full h-full flex justify-center items-center">
              <img
                src={images[0]}
                className="object-cover w-full h-full"
                alt={`User Post image`}
              />
            </div>
          )}

          {images.length > 1 &&
            images.map((img, index) => (
              <div
                key={index}
                className="min-w-full h-full flex justify-center items-center">
                <img
                  src={img}
                  className="object-cover w-full h-full"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
        </div>
        {images.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white shadow-lg text-gray-800 hover:bg-gray-100 transition z-10">
                <FaChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-white shadow-lg text-gray-800 hover:bg-gray-100 transition z-10">
                <FaChevronRight size={15} />
              </button>
            </div>
            {/* Pagination Dots */}
            <div className="absolute bottom-5 w-full flex items-center justify-center gap-2 z-10">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all w-2 h-2 rounded-full ${
                    curr === i ? "bg-indigo-500" : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <div
          onClick={() => closeEvent(null)}
          className="absolute top-2 right-3 p-3 rounded-full bg-white/60 shadow-lg  hover:bg-white transition z-10">
          <HiXMark size={24}></HiXMark>
        </div>
      </div>
    </main>
  );
}
