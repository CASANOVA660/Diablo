import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { getProduct, getProducts, getImageUrl } from '../utils/api';
import { getEffectivePrice, formatPrice } from '../utils/price';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();

  const productImages = (product?.images && product.images.length) ? product.images : (product?.image ? [product.image] : []);

  useEffect(() => {
    loadProduct();
    setSelectedImageIndex(0);
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
      
      // Load related products
      const productsResponse = await getProducts();
      const related = productsResponse.data
        .filter((p) => p._id !== id)
        .slice(0, 2);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addItem(product._id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <main className="w-full">
        <Header />
        <div className="w-full py-24 bg-white text-center">
          <p className="text-black">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="w-full">
        <Header />
        <div className="w-full py-24 bg-white text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Product Not Found</h1>
          <Link to="/products" className="text-red-600 hover:text-red-700">
            Back to Products
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full">
      <Header />
      <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Link
            to="/products"
            className="text-red-600 hover:text-red-700 mb-6 inline-block"
          >
            ← Back to Products
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-3">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 md:p-12 border border-gray-200 min-h-[280px]">
                <img
                  src={getImageUrl(productImages[selectedImageIndex]) || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-14 h-14 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                        selectedImageIndex === i ? 'border-red-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-8">
              {product.badge && (
                <div className="inline-flex w-fit px-4 py-2 bg-red-600 text-white font-bold rounded-full text-sm">
                  {product.badge}
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-black font-semibold">{product.rating}</span>
                  {product.reviews > 0 && (
                    <span className="text-gray-600">({product.reviews} reviews)</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 text-sm mb-2">Price</p>
                {product.discountPercent > 0 ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl text-gray-400 line-through">{formatPrice(product.price, product.currency)}</span>
                    <h2 className="text-5xl font-black text-red-600">{formatPrice(getEffectivePrice(product), product.currency)}</h2>
                    <span className="text-green-600 font-semibold">-{product.discountPercent}%</span>
                  </div>
                ) : (
                  <h2 className="text-5xl font-black text-red-600">{formatPrice(product.price, product.currency)}</h2>
                )}
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">
                    Why You'll Love It
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Description */}
              {product.fullDescription && (
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {product.fullDescription}
                  </p>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-black"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-black font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-black"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 font-bold text-lg rounded-lg transition ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="px-6 py-3 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isWishlisted ? 'fill-red-600 text-red-600' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                {product.inStock
                  ? 'In Stock - Ships Within 2 Days'
                  : 'Currently Out of Stock'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct._id} to={`/products/${relatedProduct._id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={getImageUrl((relatedProduct.images && relatedProduct.images[0]) || relatedProduct.image) || '/placeholder.svg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-black font-bold text-lg mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-red-600">
                          {relatedProduct.discountPercent > 0
                            ? formatPrice(getEffectivePrice(relatedProduct), relatedProduct.currency)
                            : formatPrice(relatedProduct.price, relatedProduct.currency)}
                          {relatedProduct.discountPercent > 0 && (
                            <span className="text-sm text-green-600 ml-1">-{relatedProduct.discountPercent}%</span>
                          )}
                        </span>
                        {relatedProduct.rating > 0 && (
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(relatedProduct.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}



