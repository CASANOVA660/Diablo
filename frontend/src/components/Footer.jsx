import { Link } from 'react-router-dom';
import { Instagram, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Tunisia');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Email submitted:', email);
    setEmail('');
  };

  const countries = ['Tunisia', 'United States', 'Canada', 'United Kingdom', 'France', 'Germany'];

  return (
    <footer className="w-full bg-black relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Column 1: MORE */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-4 pb-2 border-b border-white/20">
                MORE
              </h4>
              <ul className="space-y-3 text-white text-sm">
                <li>
                  <Link to="#" className="hover:text-red-600 transition">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-600 transition">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-600 transition">
                    Safety Data Sheets (SDS)
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-600 transition">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-600 transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: NEWS & UPDATES */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-4 pb-2 border-b border-white/20">
                NEWS & UPDATES
              </h4>
              <p className="text-white text-sm mb-4">
                No spam ever, just updates on sales and new products!
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 bg-white text-black rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors uppercase text-sm"
                >
                  SIGN UP
                </button>
              </form>
            </div>

            {/* Column 3: CONNECT WITH US */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-4 pb-2 border-b border-white/20">
                CONNECT WITH US
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-red-600 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-red-600 transition"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Country Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-white/20 rounded-lg text-white text-sm hover:bg-gray-800 transition"
              >
                <span>{selectedCountry}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCountryDropdown && (
                <div className="absolute bottom-full mb-2 left-0 bg-gray-900 border border-white/20 rounded-lg overflow-hidden min-w-[150px] z-20">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-800 transition block"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Copyright */}
            <p className="text-white text-sm text-center md:text-left">
              © 2026 DIABLO Auto Care Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Rewards Button */}
      <button className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all z-50">
        <ShoppingBag className="w-5 h-5" />
        <Heart className="w-4 h-4 fill-white" />
        <span>Rewards</span>
      </button>
    </footer>
  );
}



