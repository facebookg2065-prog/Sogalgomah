export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'seller' | 'buyer' | 'admin';
  password?: string; // Optional for Google Auth users, required for Email auth
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  isAd: boolean; // To distinguish between marketplace items and free ads
  isNew?: boolean;
  views?: number; // Statistic for ad views
  sellerId?: string; // To link to a specific seller
  createdAt?: string;
  description?: string;
  sellerName?: string;
  location?: string;
  sellerPhone?: string;
  sellerWhatsapp?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  LOGIN = 'LOGIN',
}

// Audio types for Gemini Live
export type AudioConfig = {
  sampleRate: number;
};

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}