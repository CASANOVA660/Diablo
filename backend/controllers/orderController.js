import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Generate unique order number
const generateOrderNumber = () => {
  return `DIABLO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Create order
export const createOrder = async (req, res) => {
  try {
    const { sessionId, shippingAddress, paymentInfo } = req.body;
    
    // Get cart
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Effective price after discount
    const getEffectivePrice = (p) => {
      const price = p.price || 0;
      const discount = Math.min(100, Math.max(0, Number(p.discountPercent) || 0));
      return Math.round(price * (1 - discount / 100) * 100) / 100;
    };

    let subtotal = 0;
    const items = cart.items.map((item) => {
      const unitPrice = getEffectivePrice(item.product);
      const itemTotal = unitPrice * item.quantity;
      subtotal += itemTotal;
      return {
        product: item.product._id,
        name: item.product.name,
        price: unitPrice,
        quantity: item.quantity,
        image: item.product.images?.[0] || item.product.image,
      };
    });
    
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Create order
    const order = new Order({
      orderNumber: generateOrderNumber(),
      items,
      shippingAddress,
      paymentInfo,
      subtotal,
      shipping,
      tax,
      total,
    });
    
    await order.save();
    
    // Clear cart
    cart.items = [];
    await cart.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



