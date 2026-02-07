import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createOrder } from '../utils/api';
import { useCart } from '../context/CartContext';
import { getEffectivePrice, formatPrice } from '../utils/price';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, sessionId, loadCart } = useCart();
  const [step, setStep] = useState('shipping');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.zip
    ) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      };

      const paymentInfo = {
        cardName: formData.cardName,
        cardNumber: formData.cardNumber,
        expiry: formData.expiry,
      };

      await createOrder({
        sessionId,
        shippingAddress,
        paymentInfo,
      });

      await loadCart(); // Clear cart
      setLoading(false);
      setStep('confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      setLoading(false);
      alert('Error processing order. Please try again.');
    }
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

  return (
    <main className="w-full">
      <Header />
      <section className="w-full bg-white py-12 md:py-16 pt-[200px] md:pt-[150px]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-black">CHECKOUT</h1>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            {['Shipping', 'Payment', 'Confirmation'].map((stepName, idx) => {
              const steps = ['shipping', 'payment', 'confirmation'];
              const isActive = steps.indexOf(step) >= idx;
              const isCompleted = steps.indexOf(step) > idx;
              return (
                <div key={stepName} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : idx + 1}
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      isActive ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  ></div>
                  <p
                    className={`text-sm font-semibold ${
                      isActive ? 'text-black' : 'text-gray-500'
                    }`}
                  >
                    {stepName}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'shipping' && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Shipping Address
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition mt-8"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {step === 'payment' && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Payment Information
                  </h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits)"
                      maxLength={16}
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        maxLength={3}
                        value={formData.cvc}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                    >
                      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                      {loading ? 'Processing...' : 'Complete Purchase'}
                    </button>
                  </form>
                </div>
              )}

              {step === 'confirmation' && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been confirmed
                    and will ship within 2 business days.
                  </p>
                  <p className="text-gray-600 mb-8">
                    A confirmation email has been sent to {formData.email}
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/"
                      className="block px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                    >
                      Back to Home
                    </Link>
                    <Link
                      to="/products"
                      className="block px-6 py-3 border border-gray-300 text-black font-bold rounded-lg hover:bg-gray-50 transition"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20 shadow-sm">
                <h3 className="text-black font-bold text-lg mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  {cart.items?.map((item) => {
                    const product = item.product;
                    if (!product) return null;
                    return (
                      <div
                        key={item._id}
                        className="flex justify-between text-gray-600 text-sm"
                      >
                        <span>
                          {product.name} x{item.quantity}
                        </span>
                        <span>
                          {formatPrice(getEffectivePrice(product) * item.quantity, product.currency)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, displayCurrency)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(tax, displayCurrency)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-black font-bold">Total</span>
                  <span className="text-red-600 font-bold text-lg">
                    {formatPrice(total, displayCurrency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}



