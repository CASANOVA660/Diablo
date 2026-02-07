import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Announcement messages that rotate with icons
  const announcements = [
    {
      text: 'SPEND US$175+, SAVE 10% | SHIPPED FROM USA | SHIPS WORLDWIDE',
      icon: '💰',
    },
    {
      text: 'FREE SHIPPING ON ORDERS OVER $50 | SHIPPED FROM USA',
      icon: '🚚',
    },
    {
      text: 'NEW ARRIVALS | LIMITED TIME OFFER | SHOP NOW',
      icon: '🆕',
    },
  ];

  // Rotate announcements every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-white text-black text-xs md:text-sm py-2 px-4 text-center border-b border-gray-200">
        <p className="font-medium flex items-center justify-center gap-2">
          <span className="text-base">{announcements[announcementIndex].icon}</span>
          <span>{announcements[announcementIndex].text}</span>
        </p>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-black">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          
          <div className="flex items-center gap-2">
            <img
              src="/image.png"
              alt="DIABLOU Icon"
              className="h-10 w-10 object-contain"
            />
            <span className="text-white font-bold text-xl">DIABLO</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-white font-semibold text-sm">
          <Link to="/products" className="hover:text-red-600 transition">
            PRODUCTS
          </Link>
          <Link to="/about" className="hover:text-red-600 transition">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:text-red-600 transition">
            CONTACT
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Social Media Icons */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-800 rounded-lg transition"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-800 rounded-lg transition"
            aria-label="YouTube"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          
          {/* User Icon */}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition">
            <User className="w-5 h-5 text-white" />
          </button>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-red-600 rounded-full text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between px-6 py-4 bg-black relative">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/pabloo.png"
            alt="DIABLO Logo"
            className="h-8 w-auto object-contain"
          />
          <div className="flex items-center gap-1.5">
            <img
              src="/image.png"
              alt="DIABLOU Icon"
              className="h-8 w-8 object-contain"
            />
            <span className="text-white font-bold text-lg">DIABLOU</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition relative text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-red-600 rounded-full text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-t border-gray-800 p-6 flex flex-col gap-4 z-50">
            <Link
              to="/products"
              className="text-white hover:text-red-600 transition font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              PRODUCTS
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-red-600 transition font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-red-600 transition font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

