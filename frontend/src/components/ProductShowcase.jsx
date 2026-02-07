import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getEffectivePrice, formatPrice } from '../utils/price';

export function ProductShowcase() {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Product data - you can make this dynamic later
  const product = {
    name: 'DIABLO CHEMICAL BUNDLE',
    price: 70,
    image: '/im103.jpeg',
    savingsMessage: 'Want it all? Take advantage of over 10% savings when you purchase the entire chemical line!',
    bundleIncludes: [
      'All Purpose Cleaner (with Dilution Mixing Bottle)',
      'Car Shampoo',
      'Ceramic Spray Coating',
      'Glass Cleaner',
      'Iron Remover',
      'Mega Foam',
      'Quick Detailer',
      'Tire Dressing',
      'Wheel & Tire Cleaner',
    ],
  };

  const handleAddToCart = async () => {
    try {
      // You'll need to get the actual product ID from your database
      // For now, this is a placeholder
      await addItem('bundle-product-id', quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <section className="w-full pt-0 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Section - Product Image */}
          <div className="w-full flex">
            <div className="w-full border-2 border-gray-200 rounded-lg bg-white p-4 flex items-center justify-center">
              <img
                src={(product.images && product.images[0]) || product.image}
                alt={product.name}
                className="w-auto h-auto max-w-[75%] max-h-[450px] object-contain"
              />
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="w-full flex flex-col justify-between py-2">
            <div>
              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-black text-black mb-1">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-2">
                <span className="text-2xl md:text-3xl font-black text-black">
                  {product.discountPercent > 0
                    ? formatPrice(getEffectivePrice(product), product.currency || 'AED')
                    : formatPrice(product.price, product.currency || 'AED')}
                </span>
              </div>

              {/* Savings Message */}
              <p className="text-gray-700 text-base md:text-lg mb-3 leading-tight">
                {product.savingsMessage}
              </p>

              {/* Bundle Inclusions */}
              <div className="mb-3">
                <h3 className="text-lg md:text-xl font-bold text-black mb-1.5">
                  The bundle includes:
                </h3>
                <ul className="space-y-0.5">
                  {product.bundleIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1 text-base">•</span>
                      <span className="text-gray-700 text-base md:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section - Quantity and Buttons */}
            <div>
              {/* Quantity Selector */}
              <div className="mb-3">
                <label className="block text-black font-semibold mb-1 text-base">
                  Quantity
                </label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 text-black font-semibold text-lg min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons - Side by Side */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>

                {/* Buy with Shop Button */}
                <button className="flex-1 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-lg flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Buy with shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

