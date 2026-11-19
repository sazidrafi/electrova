
"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const slides = [
  {
    id: 1,
    subtitle: "NEXT-GEN TECHNOLOGY",
    title: "Experience Sound Like Never Before",
    description:
      "Discover premium headphones with incredible sound quality and immersive audio.",
    buttonText: "Shop Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=85",
    background: "from-[#101c35] to-[#263d62]",
    accent: "text-blue-400",
  },
  {
    id: 2,
    subtitle: "POWER YOUR PRODUCTIVITY",
    title: "Upgrade Your Workspace",
    description:
      "Explore powerful laptops designed for work, creativity, and entertainment.",
    buttonText: "Explore Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000&q=85",
    background: "from-[#172d2b] to-[#315c50]",
    accent: "text-emerald-400",
  },
  {
    id: 3,
    subtitle: "SMARTER EVERY DAY",
    title: "Technology That Moves With You",
    description:
      "Find the latest gadgets and accessories to make every moment smarter.",
    buttonText: "Discover More",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85",
    background: "from-[#321d38] to-[#64406b]",
    accent: "text-purple-400",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden "
      aria-label="Featured products"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        className={`relative min-h-105 bg-linear-to-r ${slide.background} transition-colors duration-700 md:min-h-125`}
      >
        <div className="mx-auto grid min-h-[105 max-w-7xl items-center gap-8 px-6 py-12 md:min-h-125 md:grid-cols-2 md:px-12 lg:px-16">

          {/* Content */}
          <div
            key={`content-${slide.id}`}
            className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <p className={`mb-4 text-sm font-semibold tracking-[0.2em] ${slide.accent}`}>
              {slide.subtitle}
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {slide.title}
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/70 md:text-base">
              {slide.description}
            </p>

            <Button
              variant="primary"
              size="lg"
              className="mt-8 rounded-full bg-white px-8 font-semibold text-gray-900 hover:bg-gray-200"
            >
              {slide.buttonText}
              <ArrowRight />
            </Button>
          </div>

          {/* Product Image */}
          <div
            key={`image-${slide.id}`}
            className="flex items-center justify-center animate-in fade-in zoom-in-95 duration-700"
          >
            <img
              src={slide.image}
              alt={slide.title}
                          className="h-56 w-full max-w-md rounded-2xl object-contain drop-shadow-2xl md:h-80 lg:h-96"
                          width={400}
              height={400}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {/* <div className="absolute right-5 top-5 z-20 flex gap-2 md:right-8 md:top-1/2 md:-translate-y-1/2 md:flex-col">
          <Button
            isIconOnly
            variant="secondary"
            aria-label="Previous slide"
            onPress={prevSlide}
            className="rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          >
            <ArrowLeft />
          </Button>

          <Button
            isIconOnly
            variant="secondary"
            aria-label="Next slide"
            onPress={nextSlide}
            className="rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          >
            <ArrowRight />
          </Button>
        </div> */}

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter
        <div className="absolute bottom-6 right-8 hidden text-sm font-medium text-white/70 md:block">
          0{currentSlide + 1} / 0{slides.length}
        </div> */}
      </div>
    </section>
  );
}
