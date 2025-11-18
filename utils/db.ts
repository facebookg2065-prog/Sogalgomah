import { openDB, DBSchema } from 'idb';
import { User, Product } from '../types';
import { ALL_PRODUCTS } from '../data/mockData';

interface SouqDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  products: {
    key: string;
    value: Product;
    indexes: { 'by-category': string; 'by-seller': string };
  };
}

const DB_NAME = 'souq-al-juma-v2';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB<SouqDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Users Store
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id' });
        userStore.createIndex('by-email', 'email', { unique: true });
      }
      
      // Products Store
      if (!db.objectStoreNames.contains('products')) {
        const productStore = db.createObjectStore('products', { keyPath: 'id' });
        productStore.createIndex('by-category', 'category');
        productStore.createIndex('by-seller', 'sellerId');
        
        // Seed initial data
        ALL_PRODUCTS.forEach(product => {
            productStore.put(product);
        });
      }
    },
  });
  return db;
};

// --- User Operations ---

export const registerUserInDB = async (user: User) => {
  const db = await initDB();
  const existingUser = await db.getFromIndex('users', 'by-email', user.email);
  if (existingUser) throw new Error('البريد الإلكتروني مسجل مسبقاً');
  
  await db.put('users', user);
  return user;
};

export const loginUserInDB = async (email: string, password?: string) => {
  const db = await initDB();
  const user = await db.getFromIndex('users', 'by-email', email);
  
  if (!user) throw new Error('البريد الإلكتروني غير مسجل');
  if (password && user.password !== password) throw new Error('كلمة المرور غير صحيحة');
  
  return user;
};

// --- Product Operations ---

export const getAllProductsFromDB = async () => {
    const db = await initDB();
    return db.getAll('products');
};

export const getProductsByCategory = async (category: string) => {
    const db = await initDB();
    return db.getAllFromIndex('products', 'by-category', category);
};

export const addProductToDB = async (product: Product) => {
    const db = await initDB();
    await db.put('products', product);
    return product;
};

export const deleteProductFromDB = async (id: string) => {
    const db = await initDB();
    await db.delete('products', id);
};
