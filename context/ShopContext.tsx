import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ShopContextType } from '../types';
import { getAllProductsFromDB, addProductToDB } from '../utils/db';
import { ALL_PRODUCTS } from '../data/mockData';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Load Cart & Wishlist from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('souq_cart');
    const savedWishlist = localStorage.getItem('souq_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Load Products from DB
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const dbProducts = await getAllProductsFromDB();
            if (dbProducts.length > 0) {
                setProducts(dbProducts);
            } else {
                setProducts(ALL_PRODUCTS); // Fallback to mock
            }
        } catch (error) {
            console.error("Failed to load products", error);
            setProducts(ALL_PRODUCTS);
        }
    };
    fetchProducts();
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('souq_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('souq_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'views' | 'createdAt'>) => {
    const newProduct: Product = {
        ...productData,
        id: `prod_${Date.now()}`,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
    };
    
    // Add to local state
    setProducts(prev => [newProduct, ...prev]);
    // Add to DB
    await addProductToDB(newProduct);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      setIsCartOpen,
      cartTotal,
      cartCount,
      products,
      addProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};