
import { Category, Habit } from './types';

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.SPIRITUAL]: 'bg-purple-100 text-purple-700 border-purple-200',
  [Category.HEALTH]: 'bg-green-100 text-green-700 border-green-200',
  [Category.FINANCE]: 'bg-blue-100 text-blue-700 border-blue-200',
  [Category.SOCIAL]: 'bg-pink-100 text-pink-700 border-pink-200',
  [Category.WORK]: 'bg-amber-100 text-amber-700 border-amber-200',
  [Category.OTHER]: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Wake up', category: Category.HEALTH, createdAt: Date.now() },
  { id: '2', name: 'Journalling', category: Category.SPIRITUAL, createdAt: Date.now() },
  { id: '3', name: 'Squats', category: Category.HEALTH, createdAt: Date.now() },
  { id: '4', name: 'Call', category: Category.SOCIAL, createdAt: Date.now() },
  { id: '5', name: 'Insta content', category: Category.WORK, createdAt: Date.now() },
  { id: '6', name: 'Bath', category: Category.HEALTH, createdAt: Date.now() },
  { id: '7', name: 'Study 📚', category: Category.WORK, createdAt: Date.now() },
  { id: '8', name: 'Drink water', category: Category.HEALTH, createdAt: Date.now() },
  { id: '9', name: 'Self talk', category: Category.SPIRITUAL, createdAt: Date.now() },
  { id: '10', name: '3 time meal', category: Category.HEALTH, createdAt: Date.now() },
  { id: '11', name: 'Clothes 🧺', category: Category.OTHER, createdAt: Date.now() },
  { id: '12', name: 'Play games', category: Category.SOCIAL, createdAt: Date.now() },
  { id: '13', name: 'Sleep well 😴', category: Category.HEALTH, createdAt: Date.now() },
  { id: '14', name: 'Rest', category: Category.HEALTH, createdAt: Date.now() },
  { id: '15', name: 'Exercise 🏃', category: Category.HEALTH, createdAt: Date.now() },
  { id: '16', name: 'Room clean 🧹', category: Category.OTHER, createdAt: Date.now() },
  { id: '17', name: 'Nam Jap 🙏', category: Category.SPIRITUAL, createdAt: Date.now() },
  { id: '18', name: 'Water Bottle', category: Category.HEALTH, createdAt: Date.now() },
];
