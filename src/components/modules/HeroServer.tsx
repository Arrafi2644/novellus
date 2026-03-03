
"use client"
import { Button } from '../ui/button'
  export function HeroServer() {

      const handleScroll = () => {
    const section = document.getElementById("home-page-main-section");
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
    return (
      <div className="relative flex items-center w-full font-sans">
        {/* Main Content Container */}
        <div className="container mx-auto overflow-hidden relative z-10 py-6">
          <div className='space-y-3' >
            <h2 className='text-3xl lg:text-5xl font-bold text-gray-800'>Pizzeria e stuzzicheria da Asporto</h2>
  
            {/* Subheading */}
              <p className="text-lg sm:text-xl text-gray-800 font-medium mb-6 leading-relaxed max-w-2xl">
               Semplifichiamo la tua esperienza culinaria così puoi concentrarti sui momenti che contano.
              </p>
  
            {/* CTA Buttons */}
              <div className="flex flex-col max-w-3xl sm:flex-row gap-4 px-4 md:px-0">
                <Button
                 onClick={handleScroll}
                className='btn-lg cursor-pointer transition-all duration-300 hover:scale-105'>Order Now</Button>
              </div>
          </div>
        </div>
      </div>
    )
  }
  