import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem } from '../utils/api';
import { getSessionId } from '../utils/session';
import { getEffectivePrice } from '../utils/price';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await getCart(sessionId);
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    try {
      const response = await addToCart({ sessionId, productId, quantity });
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const response = await updateCartItem(sessionId, { itemId, quantity });
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await removeCartItem(sessionId, { itemId });
      setCart(response.data);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const getCartCount = () => {
    return cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  const getCartTotal = () => {
    if (!cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce((sum, item) => {
      const product = item.product;
      if (product && product.price != null) {
        return sum + getEffectivePrice(product) * item.quantity;
      }
      return sum;
    }, 0);
  };

  const value = {
    cart,
    loading,
    addItem,
    updateItem,
    removeItem,
    loadCart,
    getCartCount,
    getCartTotal,
    sessionId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};



