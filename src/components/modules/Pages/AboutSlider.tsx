"use client"
import Image from "next/image";

import { useEffect, useState } from "react";


const images = ["/about4.jpg", "/about5.jpg", "/about6.jpg"];
const AboutSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // change every 2s

        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <section className="py-20 px-6 text-center">
                <div className="relative max-w-6xl w-full h-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    {images.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt="Ayon Saha"
                            fill
                            className={`object-cover rounded-2xl transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default AboutSlider;