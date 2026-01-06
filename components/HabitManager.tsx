
import React, { useState } from 'react';
import { Habit, Category } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface HabitManagerProps {
  habits: Habit[];
  addHabit: (name: string, category: Category) => void;
  removeHabit: (id: string) => void;
}

const HabitManager: React.FC<HabitManagerProps> = ({ habits, addHabit, removeHabit }) => {
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>(Category.OTHER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      addHabit(newName.trim(), newCategory);
      setNewName('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Create New Habit</h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Read 10 pages"
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as Category)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-all"
          >
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Habit
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">{habit.name}</span>
              <span className={`text-[10px] w-fit px-1.5 py-0.5 rounded-full border mt-1 ${CATEGORY_COLORS[habit.category]}`}>
                {habit.category}
              </span>
            </div>
            <button
              onClick={() => removeHabit(habit.id)}
              className="text-slate-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-red-50"
              title="Delete Habit"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitManager;
