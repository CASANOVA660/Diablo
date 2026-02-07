import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Award, Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <main className="w-full">
      <Header />
      <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">ABOUT DIABLO</h1>
          <p className="text-gray-600 text-lg">Premium auto detailing products for car enthusiasts</p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Mission Section with Image */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm">
                  <h2 className="text-3xl md:text-4xl font-black text-black mb-6">OUR MISSION</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    At DIABLO, we believe that every detail matters. Our mission is to provide premium auto detailing products
                    that help you keep your vehicle looking fresh and protected, no matter where your journey takes you.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    We combine professional-grade cleaning formulas with innovative protection technology to ensure your
                    vehicle stays in perfect condition for years to come.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src="/image101.jpeg"
                    alt="DIABLO Auto Care Mission"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black font-bold text-xl mb-2">Quality First</h3>
              <p className="text-gray-600">
                We use only the highest quality ingredients and materials in our products.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black font-bold text-xl mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Built by car enthusiasts, for car enthusiasts. We understand what you need.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black font-bold text-xl mb-2">Results Focused</h3>
              <p className="text-gray-600">
                Every product is tested and proven to deliver professional results.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black font-bold text-xl mb-2">Passion Driven</h3>
              <p className="text-gray-600">
                We're passionate about keeping your vehicle looking its absolute best.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6">OUR STORY</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                DIABLO was born from a simple observation: car enthusiasts invest time and money in finding the
                perfect vehicle, but often struggle to keep them looking fresh. We set out to change that.
              </p>
              <p>
                Starting with a small team of detailing experts and car aficionados, we developed a comprehensive
                line of products that combine powerful cleaning agents with gentle, non-damaging formulas. Our
                products quickly became favorites among collectors and casual drivers alike.
              </p>
              <p>
                Today, DIABLO continues to innovate, always staying ahead of the curve with new products and
                technologies designed to protect and preserve your vehicle investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


