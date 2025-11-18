import { openDB } from 'idb';
import { User } from '../types';

const DB_NAME = 'souq-al-juma-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'email' });
      }
    },
  });
};

export const registerUserInDB = async (user: User & { password?: string }) => {
  const db = await initDB();
  const existingUser = await db.get('users', user.email);
  if (existingUser) {
    throw new Error('البريد الإلكتروني مسجل مسبقاً');
  }
  await db.put('users', user);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const loginUserInDB = async (email: string, password?: string) => {
  const db = await initDB();
  const user = await db.get('users', email);
  
  if (!user) {
    throw new Error('البريد الإلكتروني غير مسجل');
  }
  
  // In a real app, we would hash passwords. 
  // For this local demo, we compare plain text or handle Google auth mock.
  if (password && user.password !== password) {
     throw new Error('كلمة المرور غير صحيحة');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};