
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import HabitGrid from './components/HabitGrid';
import Dashboard from './components/Dashboard';
import HabitManager from './components/HabitManager';
import { Habit, HabitLog, Category } from './types';
import { INITIAL_HABITS } from './constants';
import { getMonthName } from './utils/dateUtils';

const STORAGE_KEY = 'habitpulse_2026_data';

const App: React.FC = () => {
  // State initialization
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_habits`);
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [logs, setLogs] = useState<Record<string, HabitLog>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
    return saved ? JSON.parse(saved) : {};
  });

  const [activeTab, setActiveTab] = useState<'tracker' | 'dashboard' | 'settings'>('tracker');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(2026); // Hardcoded target year

  // Persistence
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_habits`, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(logs));
  }, [logs]);

  // Actions
  const toggleHabit = useCallback((habitId: string, date: string) => {
    setLogs(prev => {
      const key = `${habitId}-${date}`;
      const existing = prev[key];
      
      const newLogs = { ...prev };
      if (existing && existing.completed) {
        // Toggle OFF
        newLogs[key] = {
          ...existing,
          completed: false,
          timestamp: Date.now()
        };
      } else {
        // Toggle ON
        newLogs[key] = {
          id: Math.random().toString(36).substr(2, 9),
          habitId,
          date,
          completed: true,
          timestamp: Date.now()
        };
      }
      return newLogs;
    });
  }, []);

  const addHabit = (name: string, category: Category) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      category,
      createdAt: Date.now()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const removeHabit = (id: string) => {
    if (confirm('Are you sure you want to remove this habit? History for this habit will be hidden.')) {
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  const changeMonth = (delta: number) => {
    let nextMonth = currentMonth + delta;
    let nextYear = currentYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    } else if (nextMonth < 0) {
      nextMonth = 11;
      nextYear--;
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">HabitPulse <span className="text-indigo-600">2026</span></h1>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">Master Your Routine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-indigo-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="min-w-[140px] text-center">
              <span className="text-sm font-bold text-slate-700">{getMonthName(currentMonth)} {currentYear}</span>
            </div>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500 hover:text-indigo-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Mobile-Friendly Tabs */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-8 max-w-md">
          <button 
            onClick={() => setActiveTab('tracker')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === 'tracker' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Tracker
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Manage
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'tracker' && (
            <HabitGrid 
              currentMonth={currentMonth} 
              currentYear={currentYear} 
              habits={habits} 
              logs={logs} 
              toggleHabit={toggleHabit} 
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              currentMonth={currentMonth} 
              currentYear={currentYear} 
              habits={habits} 
              logs={logs} 
            />
          )}

          {activeTab === 'settings' && (
            <HabitManager 
              habits={habits} 
              addHabit={addHabit} 
              removeHabit={removeHabit} 
            />
          )}
        </div>
      </main>

      {/* Sticky Quick Access (Mobile) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button 
          onClick={() => setActiveTab('tracker')}
          className="w-14 h-14 bg-indigo-600 rounded-full shadow-xl shadow-indigo-300 flex items-center justify-center text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      
      {/* Offline Banner Indicator */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-8 py-2 text-[10px] text-slate-400 text-center uppercase tracking-widest pointer-events-none">
        Auto-Saving to Local Storage • 2026 Ready • Fully Offline
      </footer>
    </div>
  );
};

export default App;
