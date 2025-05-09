import { useEffect, useState } from "react";
import 면도 from "../assets/001.png";
import 책상 from "../assets/002.png";
import 음식 from "../assets/003.png";

const slides = [
  { src: 면도, alt: "면도" },
  { src: 책상, alt: "책상" },
  { src: 음식, alt: "음식" },
];

const AutoSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(interval);
  }, []);

  return (
<div className="w-full h-72 md:h-96 overflow-hidden rounded shadow relative">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.src}
          alt={slide.alt}
          className={`w-full h-full object-cover  absolute transition-opacity duration-700 ease-in-out ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default AutoSlider;
