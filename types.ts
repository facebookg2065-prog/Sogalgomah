export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'seller' | 'buyer' | 'admin';
  password?: string; 
  phone?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  images?: string[]; // For product details gallery
  category: string;
  isAd: boolean;
  isNew?: boolean;
  views?: number;
  sellerId?: string;
  sellerName?: string;
  sellerAvatar?: string;
  location?: string;
  sellerPhone?: string;
  sellerWhatsapp?: string;
  description?: string;
  condition?: 'new' | 'used';
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
  products: Product[]; // Global products state
  addProduct: (product: Omit<Product, 'id' | 'views' | 'createdAt'>) => Promise<void>;
}
