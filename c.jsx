import React, { useState } from "react";

const slides = [
  {
    image: "https://i.ibb.co.com/8WBZ5qp/Bid7-min.png",
    label: "Apartments",
  },
  {
    image: "https://i.ibb.co.com/fz5Tc0cX/Bid6-min.png",
    label: "Cabins",
  },
  {
    image: "https://i.ibb.co.com/rKgLv6MZ/Bid2-min.png",
    label: "Hotels",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const getSlideIndex = (indexOffset) => (current + indexOffset + length) % length;

  return (
    <div className="bg-[#242424]  text-white p-8 rounded-3xl max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-6">
        <span className="bg-[#774C9E] text-xs px-4 py-1 rounded-full inline-block mb-2">
          OVER 1.5 MILLION
        </span>
        <h2 className="text-3xl font-bold">
          Amazing <span className="text-[#774C9E]">LGBTQ Friendly Places</span><br />
          to Stay around the world
        </h2>
        <p className="mt-2 text-sm text-gray-300 max-w-2xl mx-auto">
          Whether you're venturing to the vibrant streets of San Francisco or exploring the cultural melting pot of Berlin,
          Gaybnb Travel has you covered. With over 1.5 million beds in our diverse and carefully curated collection...
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-6 relative h-[360px]">
        {/* Left image */}
        <div
          onClick={() => setCurrent(getSlideIndex(-1))}
          className="w-[250px] h-[320px] rounded-2xl overflow-hidden cursor-pointer opacity-30 hover:opacity-50 transition duration-300 transform scale-90"
        >
          <img
            src={slides[getSlideIndex(-1)].image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center/main image */}
        <div className="w-[380px] h-[360px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right image */}
        <div
          onClick={() => setCurrent(getSlideIndex(1))}
          className="w-[250px] h-[320px] rounded-2xl overflow-hidden cursor-pointer opacity-30 hover:opacity-50 transition duration-300 transform scale-90"
        >
          <img
            src={slides[getSlideIndex(1)].image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-6 text-xl font-bold tracking-widest text-white">
        {slides[current].label.toUpperCase()}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-3 gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === current ? "bg-[#774C9E]" : "bg-gray-600"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
