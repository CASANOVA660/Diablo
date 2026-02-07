import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Car Enthusiast',
      rating: 5,
      text: 'DIABLO products have completely transformed how I care for my vehicles. The quality is unmatched and the results speak for themselves!',
      image: '/image101.jpeg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Professional Detailer',
      rating: 5,
      text: 'As a professional detailer, I trust DIABLO for all my clients. The products are reliable, effective, and deliver consistent professional results.',
      image: '/image101.jpeg',
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Car Collector',
      rating: 5,
      text: 'I use DIABLO on my entire collection. The protection and shine they provide is incredible. My cars have never looked better!',
      image: '/image101.jpeg',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Weekend Warrior',
      rating: 5,
      text: 'Even as a beginner, DIABLO products made it easy to achieve professional-looking results. The instructions are clear and the products work perfectly.',
      image: '/image101.jpeg',
    },
    {
      id: 5,
      name: 'David Martinez',
      role: 'Auto Shop Owner',
      rating: 5,
      text: 'We switched our entire shop to DIABLO products. Our customers love the results and we love the quality. Best decision we made!',
      image: '/image101.jpeg',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      role: 'Car Care Blogger',
      rating: 5,
      text: 'I\'ve tried countless products, but DIABLO stands out. The quality is exceptional and the value is unbeatable. Highly recommend!',
      image: '/image101.jpeg',
    },
  ];

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4 md:px-8"
                >
                  <div className="bg-gray-50 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
                    {/* Stars Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center mb-8 italic">
                      "{testimonial.text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-black text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-red-600 w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-2 border-gray-200 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-2 border-gray-200 rounded-full p-3 shadow-lg transition-all z-10"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

