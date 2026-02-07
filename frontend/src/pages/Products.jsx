import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart } from 'lucide-react';
import { getProducts } from '../utils/api';
import { getEffectivePrice, formatPrice } from '../utils/price';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <main className="w-full">
        <Header />
        <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <p className="text-black">Loading products...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full">
      <Header />
      <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            ALL PRODUCTS
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Explore our complete collection of premium auto detailing products. From professional-grade cleaners to advanced protection formulas, find everything you need to keep your vehicle looking its absolute best. Each product is carefully crafted to deliver exceptional results.
          </p>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img
                      src={(product.images && product.images[0]) || product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-black font-bold text-lg mb-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-xs mb-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-xl font-bold text-red-600">
                        {product.discountPercent > 0
                          ? formatPrice(getEffectivePrice(product), product.currency)
                          : formatPrice(product.price, product.currency)}
                        {product.discountPercent > 0 && <span className="text-sm text-green-600 ml-1">-{product.discountPercent}%</span>}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product._id);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Heart
                          className={`w-4 h-4 transition ${
                            wishlist.includes(product._id)
                              ? 'fill-red-600 text-red-600'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}



