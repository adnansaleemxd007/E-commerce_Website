import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/new_green_banner_1.png",
      alt: "Dine in Style 50% Off",
    },
    {
      id: 2,
      image: "/images/new_green_banner_2.png",
      alt: "Flash Sale Electronics",
    },
  ];

  const sideBanner = "/images/new_green_side_banner.png";

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px]">
        
        {/* Main Slider (Left) */}
        <div className="flex-1 relative bg-white rounded-xl overflow-hidden shadow-card group">
          
          {/* Images container */}
          <div 
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full h-full flex-shrink-0">
                <img 
                  src={slide.image} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-navy-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-navy-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === index ? "bg-primary-500 w-8" : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Static Side Banner (Right) */}
        <div className="w-full lg:w-[320px] h-[200px] lg:h-full bg-white rounded-xl shadow-card overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-card-hover transition-shadow relative">
          <img 
            src={sideBanner} 
            alt="Try ECOMZY App" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay effect on hover */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors" />
        </div>

      </div>
    </div>
  );
};

export default HeroCarousel;
