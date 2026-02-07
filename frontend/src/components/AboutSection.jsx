export function AboutSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Section - Large Car Image (2/3 width) */}
          <div className="lg:col-span-2 w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <img
              src="/image101.jpeg"
              alt="Red Sports Car"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section - Text Block and Image (1/3 width) */}
          <div className="flex flex-col">
            {/* Top - Text Block with Red Banner */}
            <div className="w-full bg-gray-800 p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="mb-4">
                <div className="bg-red-600 inline-block px-4 py-3 mb-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase leading-tight">
                    EVERY DETAIL MATTERS.
                  </h2>
                </div>
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                DIABLO Auto Care, founded by our team, elevates auto detailing with a focus on producing essential, high quality products. Our mission is straightforward: ensure your next auto detailing project is better than your last.
              </p>
            </div>

            {/* Bottom - Detailing Image */}
            <div className="w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
              <img
                src="/im102.jpeg"
                alt="Man Detailing Car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

