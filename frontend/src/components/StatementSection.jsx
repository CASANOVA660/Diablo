export function StatementSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Mission & Vision */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-black mb-4">
                OUR MISSION
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                To provide premium quality auto detailing products that help you achieve professional results every time. We believe in quality over quantity, ensuring every product delivers exceptional performance.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-black mb-4">
                OUR VISION
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                To become the most trusted name in auto detailing, empowering car enthusiasts worldwide to maintain and protect their vehicles with confidence and expertise.
              </p>
            </div>
          </div>

          {/* Right Side - Values & Quote */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-black mb-4">
                OUR VALUES
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Quality, integrity, and innovation drive everything we do. We're committed to continuous improvement and building lasting relationships with our community of car care enthusiasts.
              </p>
            </div>

            <div className="bg-red-600 p-6 md:p-8 rounded-lg">
              <svg
                className="w-8 h-8 text-white mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-lg md:text-xl font-semibold italic leading-relaxed">
                "Every detail matters. That's why we craft each product with precision, passion, and an unwavering commitment to excellence."
              </p>
              <p className="text-white/90 font-medium mt-4">— DIABLO Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


