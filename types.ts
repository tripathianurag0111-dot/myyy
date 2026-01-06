
export enum Category {
  SPIRITUAL = 'Spiritual',
  HEALTH = 'Health',
  FINANCE = 'Finance',
  SOCIAL = 'Social',
  WORK = 'Work',
  OTHER = 'Other'
}

export interface Habit {
  id: string;
  name: string;
  category: Category;
  createdAt: number;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  timestamp: number; // For tracking exactly when it was marked
}

export interface AppState {
  habits: Habit[];
  logs: Record<string, HabitLog>; // key: "habitId-date"
}
