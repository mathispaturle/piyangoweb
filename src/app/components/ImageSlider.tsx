"use client";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import LightboxPreview from "@/app/components/product/Lightbox";

// Interface for image data
interface ImageData {
  src: string;
}


export default function ImageSlider({ images }: { images: string[] }): JSX.Element {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slides, setSlides] = useState<any>([]);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {

    var s: any = [];

    if (images.length > 0) {
      images.forEach((image, index) => {
        s.push({
          src: image
        })
      })
      setSlides(s)
    }
  }, [images])


  return (
    <div className="relative w-full mx-auto">
      <div
        className="relative h-[460px]"
      >
        <Image
          src={images[currentIndex]}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <button
        className="absolute left-0 top-1/2 transform h-12 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-white text-black p-2 group"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white" />
      </button>

      <div className="flex justify-center mt-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mx-1 ${index === currentIndex
              ? "bg-main rounded-xl"
              : "bg-gray-300 rounded-xl"
              } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 transform h-12 rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2  bg-white text-black p-2 group"
        onClick={nextSlide}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white" />
      </button>

      <div className="flex justify-center mt-4 absolute bottom-2 right-2">
        <LightboxPreview images={slides} />
      </div>
    </div>
  );
}