import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProducts, getImageUrl } from '../utils/api';
import { useCart } from '../context/CartContext';
import { getEffectivePrice, formatPrice } from '../utils/price';

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.slice(0, 4)); // Show first 4 products
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      await addItem(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-black text-center">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            TRY OUR BESTSELLERS
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to deep clean, maintain and protect your vehicle.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
            >
              {/* Product Image */}
              <Link to={`/products/${product._id}`} className="block">
                <div className="relative bg-white aspect-square flex items-center justify-center p-8">
                  <img
                    src={getImageUrl((product.images && product.images[0]) || product.image) || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <Link to={`/products/${product._id}`} className="flex-1">
                  <h3 className="text-black font-bold text-lg mb-2 hover:text-red-600 transition">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </Link>

                {/* Price */}
                <div className="mb-3">
                  {product.discountPercent > 0 ? (
                    <span className="text-2xl font-bold text-black">
                      {formatPrice(getEffectivePrice(product), product.currency)}
                      <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(product.price, product.currency)}</span>
                      <span className="text-sm text-green-600 ml-1">-{product.discountPercent}%</span>
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-black">{formatPrice(product.price, product.currency)}</span>
                  )}
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-black text-black"
                    />
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  className="w-full border-2 border-red-600 text-red-600 font-semibold py-3 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



