import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const addToCart = (product) => {
    setProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const increase = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const decrease = (id) => {
    setProducts(prev => prev.map(p => p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p));
  };

  const remove = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  return (
    <CartContext.Provider value={{ products, addToCart, increase, decrease, remove, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
