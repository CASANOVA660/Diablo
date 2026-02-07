import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Trash2, Plus, Minus, ShoppingCart, Shield, Truck, Lock, CheckCircle, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../utils/api';
import { getEffectivePrice, formatPrice } from '../utils/price';

export default function CartPage() {
  const { cart, updateItem, removeItem, loading, loadCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    setIsClient(true);
    loadCart();
  }, []);

  useEffect(() => {
    if (isClient) {
      loadRecommendedProducts();
    }
  }, [cart.items, isClient]);

  const loadRecommendedProducts = async () => {
    try {
      const response = await getProducts();
      // Get products not in cart
      const cartProductIds = cart.items?.map(item => item.product?._id) || [];
      const recommended = response.data
        .filter(p => !cartProductIds.includes(p._id))
        .slice(0, 4);
      setRecommendedProducts(recommended);
    } catch (error) {
      console.error('Error loading recommended products:', error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }
    await updateItem(itemId, quantity);
  };

  const subtotal =
    cart.items?.reduce((sum, item) => {
      const product = item.product;
      if (product && product.price != null) {
        return sum + getEffectivePrice(product) * item.quantity;
      }
      return sum;
    }, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const displayCurrency = cart.items?.[0]?.product?.currency || 'USD';

  if (!isClient || loading) return null;

  return (
    <main className="w-full">
      <Header />
      <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            SHOPPING CART
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Review your selected items and proceed to checkout. Enjoy free shipping on orders over $50 and our 30-day money-back guarantee on all premium auto detailing products.
          </p>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {!cart.items || cart.items.length === 0 ? (
            <>
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-black mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Add some DIABLO products to get started
                </p>
                <Link
                  to="/products"
                  className="inline-block px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Recommended Products for Empty Cart */}
              {recommendedProducts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-black text-black mb-8">
                    RECOMMENDED FOR YOU
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedProducts.map((product) => (
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
                                {formatPrice(getEffectivePrice(product), product.currency)}
                                {product.discountPercent > 0 && <span className="text-sm text-green-600 ml-1">-{product.discountPercent}%</span>}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {cart.items.map((item) => {
                      const product = item.product;
                      if (!product) return null;
                      return (
                        <div
                          key={item._id}
                          className="bg-white border border-gray-200 rounded-lg p-6 flex gap-6 shadow-sm"
                        >
                          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={(product.images && product.images[0]) || product.image || '/placeholder.svg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-black font-bold text-lg">
                                {product.name}
                              </h3>
                              <p className="text-red-600 font-bold text-lg mt-2">
                                {formatPrice(getEffectivePrice(product), product.currency)}
                                {product.discountPercent > 0 && <span className="text-sm text-green-600 ml-1">-{product.discountPercent}%</span>}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, item.quantity - 1)
                                  }
                                  className="px-3 py-1 text-gray-600 hover:text-black"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-1 text-black font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, item.quantity + 1)
                                  }
                                  className="px-3 py-1 text-gray-600 hover:text-black"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="ml-auto px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-8 sticky top-20 shadow-sm">
                    <h2 className="text-black font-bold text-2xl mb-6">
                      ORDER SUMMARY
                    </h2>
                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal, displayCurrency)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? 'text-green-600' : ''}>
                          {shipping === 0 ? 'FREE' : formatPrice(shipping, displayCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>{formatPrice(tax, displayCurrency)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-black font-bold text-xl mb-8">
                      <span>Total</span>
                      <span className="text-red-600">{formatPrice(total, displayCurrency)}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-gray-600 text-sm mb-4">
                        Free shipping on orders over $50
                      </p>
                    )}
                    <Link
                      to="/checkout"
                      className="w-full block text-center px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition mb-4"
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                    <Link
                      to="/products"
                      className="w-full block text-center px-8 py-3 border border-gray-300 text-black font-bold rounded-lg hover:bg-gray-50 transition"
                    >
                      Continue Shopping
                    </Link>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Shield className="w-5 h-5 text-red-600" />
                          <span>Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Truck className="w-5 h-5 text-red-600" />
                          <span>Free Shipping Over $50</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <CheckCircle className="w-5 h-5 text-red-600" />
                          <span>30-Day Money Back Guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
            <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-red-600" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-2">Standard Shipping</h4>
                  <p className="text-gray-600 text-sm">
                    $10.00 - 5-7 business days
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Express Shipping</h4>
                  <p className="text-gray-600 text-sm">
                    $20.00 - 2-3 business days
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Free Shipping</h4>
                  <p className="text-gray-600 text-sm">
                    Orders over $50 - 5-7 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Guarantees */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <Lock className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-black mb-2">Secure Payment</h4>
                <p className="text-gray-600 text-sm">
                  Your payment information is encrypted and secure
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-black mb-2">Quality Guaranteed</h4>
                <p className="text-gray-600 text-sm">
                  Premium products backed by our satisfaction guarantee
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <CheckCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-bold text-black mb-2">Easy Returns</h4>
                <p className="text-gray-600 text-sm">
                  30-day return policy on all products
                </p>
              </div>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-black text-black mb-8">
                  YOU MIGHT ALSO LIKE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
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
                              {formatPrice(getEffectivePrice(product), product.currency)}
                              {product.discountPercent > 0 && <span className="text-sm text-green-600 ml-1">-{product.discountPercent}%</span>}
                            </span>
                            {product.rating > 0 && (
                              <div className="flex gap-1 items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600">{product.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}



