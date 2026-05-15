'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <section className="relative bg-gradient-to-br from-lightGray to-gray-300 py-12 md:py-16 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Hero Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="https://plus.unsplash.com/premium_photo-1681345599459-8dac0feb3491?w=600&h=400&fit=crop"
                alt="Wooden Chair"
                width={600}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Hero Info */}
          <div className="relative z-20 px-4 lg:px-0">
            {/* Orange Triangle */}
            <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-primary mb-5"></div>

            <p className="text-xs md:text-sm leading-relaxed text-gray-600 mb-6 text-justify">
              Discover our handcrafted wooden chair collection, combining traditional craftsmanship with modern design. Each piece is carefully crafted from premium materials to bring warmth and elegance to your living space.
            </p>

            {/* Price Section */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-[10px] text-gray-400 tracking-widest">OUR PRICE</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">£129</span>
            </div>

            {/* Add to Cart Button */}
            <button className="bg-gray-300 text-darkGray px-10 py-3 rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              ADD TO 🛒
            </button>
          </div>
        </div>

        {/* Decorative Curve */}
        <div className="absolute bottom-[-50px] right-[-100px] w-[800px] h-[200px] border-[3px] border-primary rounded-full border-t-transparent border-l-transparent transform rotate-[-10deg] hidden lg:block"></div>

        {/* Arrow Navigation */}
        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 flex space-x-3 z-30">
          <button 
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            className="w-10 h-10 md:w-12 md:h-12 border-2 border-darkGray text-darkGray flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            ‹
          </button>
          <button 
            onClick={() => setCurrentSlide(currentSlide + 1)}
            className="w-10 h-10 md:w-12 md:h-12 border-2 border-darkGray text-darkGray flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
