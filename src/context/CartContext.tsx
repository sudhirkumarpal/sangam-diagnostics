'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BookingItem } from '@/types';

interface CartContextType {
  items: BookingItem[];
  addItem: (item: Omit<BookingItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  couponCode: string;
  discount: number;
  collectionFee: number;
  total: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  bookNow: (item: Omit<BookingItem, 'quantity'>) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BookingItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sangam_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCity = localStorage.getItem('sangam_city');
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('sangam_cart', JSON.stringify(items));
        localStorage.setItem('sangam_city', selectedCity);
      } catch {
        // ignore
      }
    }
  }, [items, selectedCity, isLoaded]);

  const addItem = (newItem: Omit<BookingItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as BookingItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscount(0);
  };

  const bookNow = (item: Omit<BookingItem, 'quantity'>) => {
    addItem(item);
    if (typeof window !== 'undefined') {
      window.location.href = '/booking';
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Free home collection for orders >= 500
  const collectionFee = subtotal >= 500 || subtotal === 0 ? 0 : 100;
  const total = Math.max(0, subtotal - discount + collectionFee);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return { success: false, message: 'Please enter a coupon code.' };
    }
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponCode(clean);
        setDiscount(data.discount);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Invalid coupon' };
      }
    } catch {
      return { success: false, message: 'Failed to validate coupon.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        couponCode,
        discount,
        collectionFee,
        total,
        applyCoupon,
        removeCoupon,
        bookNow,
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
