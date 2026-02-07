import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // For now, using one image. You can add more images to the array later
  const slides = [
    {
      image: '/image101.jpeg',
      alt: 'DIABLO Product Collection',
    },
  
    {
      image: '/pabloo.png',
      alt: 'DIABLO Logo',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Full Screen Hero Carousel */}
      <section className="w-full bg-gray-100 relative pt-[96px]" style={{ height: 'calc(100vh - 96px)' }}>
        <div className="w-full h-full relative">
          {/* Carousel Container */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Slides */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="min-w-full h-full flex items-center justify-center"
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/80 text-white p-3 rounded-full transition z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/80 text-white p-3 rounded-full transition z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Carousel Indicators */}
            {slides.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-red-600 w-8'
                        : 'bg-white/50 hover:bg-white/80 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features/Guarantees Section */}
      <section className="w-full bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Fast Shipping */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <svg
                  className="w-12 h-12 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 7h16M4 7l8 4m-8-4l8-4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black text-sm md:text-base mb-1">
                FAST SHIPPING
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                (US & WORLDWIDE)
              </p>
            </div>

            {/* 24/7 Customer Support */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 relative w-12 h-12">
                <svg
                  className="w-12 h-12 text-black absolute"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <svg
                  className="w-5 h-5 text-black absolute top-0 right-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black text-sm md:text-base mb-1">
                24/7 CUSTOMER
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">SUPPORT</p>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 relative w-12 h-12">
                <svg
                  className="w-12 h-12 text-black absolute"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <div className="absolute -top-1 -right-1 flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <h3 className="font-bold text-black text-sm md:text-base mb-1">
                SATISFACTION
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">GUARANTEE</p>
            </div>

            {/* SSL Secure Checkout */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 relative w-12 h-12">
                <svg
                  className="w-12 h-12 text-black absolute"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <svg
                  className="w-5 h-5 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-black text-sm md:text-base mb-1">
                SSL SECURE
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">CHECKOUT</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



