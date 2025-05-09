import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 면도 from "../assets/001.png";
import 책상 from "../assets/002.png";
import 음식 from "../assets/003.png";

const slides = [
  { src: 면도, alt: "면도", link: "/category/생활용품" },
  { src: 책상, alt: "책상", link: "/category/홈인테리어" },
  { src: 음식, alt: "음식", link: "/category/식품" },
];

const AutoSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-72 md:h-96 overflow-hidden rounded shadow relative">
      {slides.map((slide, index) => (
        <img
  key={index}
  src={slide.src}
  alt={slide.alt}
  onClick={() => navigate(slide.link)}
  className={`w-full h-full object-cover absolute transition-opacity duration-700 ease-in-out cursor-pointer ${
    current === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
/>
      ))}
    </div>
  );
};

export default AutoSlider;
