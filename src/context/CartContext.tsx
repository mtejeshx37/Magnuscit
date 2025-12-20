import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  type: string;
  price: string;
  priceValue: number; // Numeric value for calculations
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Check if item already exists
      if (prev.some((cartItem) => cartItem.id === item.id)) {
        return prev; // Don't add duplicates
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.priceValue, 0);
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
