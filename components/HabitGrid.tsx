
import React, { useMemo } from 'react';
import { Habit, HabitLog, Category } from '../types';
import { getDaysInMonth, getDayAbbreviation, formatDate } from '../utils/dateUtils';
import { CATEGORY_COLORS } from '../constants';

interface HabitGridProps {
  currentMonth: number;
  currentYear: number;
  habits: Habit[];
  logs: Record<string, HabitLog>;
  toggleHabit: (habitId: string, date: string) => void;
}

const HabitGrid: React.FC<HabitGridProps> = ({ currentMonth, currentYear, habits, logs, toggleHabit }) => {
  const days = useMemo(() => getDaysInMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  const dayArray = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 sticky top-0 z-10">
          <tr>
            <th className="p-4 border-b border-r border-slate-200 min-w-[200px] text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 sticky left-0 z-20">
              Habits / Days
            </th>
            {dayArray.map(day => (
              <th key={day} className="p-2 border-b border-slate-200 text-center min-w-[40px]">
                <div className="text-[10px] text-slate-400 font-medium">
                  {getDayAbbreviation(day, currentMonth, currentYear).toUpperCase()}
                </div>
                <div className="text-sm font-bold text-slate-700">{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-3 border-b border-r border-slate-200 bg-white sticky left-0 z-10">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800">{habit.name}</span>
                  <span className={`text-[10px] w-fit px-1.5 py-0.5 rounded-full border mt-1 ${CATEGORY_COLORS[habit.category]}`}>
                    {habit.category}
                  </span>
                </div>
              </td>
              {dayArray.map(day => {
                const dateStr = formatDate(new Date(currentYear, currentMonth, day));
                const logKey = `${habit.id}-${dateStr}`;
                const isCompleted = logs[logKey]?.completed;

                return (
                  <td 
                    key={day} 
                    className={`p-0 border-b border-slate-100 text-center cursor-pointer grid-cell-transition ${isCompleted ? 'bg-indigo-50/30' : ''}`}
                    onClick={() => toggleHabit(habit.id, dateStr)}
                  >
                    <div className="flex items-center justify-center h-12 w-full">
                      <div className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center
                        ${isCompleted 
                          ? 'bg-indigo-600 border-indigo-600 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                      >
                        {isCompleted && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 font-medium text-slate-600">
          <tr>
            <td className="p-3 border-r border-slate-200 sticky left-0 bg-slate-50 text-xs">Daily Completion %</td>
            {dayArray.map(day => {
                const dateStr = formatDate(new Date(currentYear, currentMonth, day));
                const completedCount = habits.filter(h => logs[`${h.id}-${dateStr}`]?.completed).length;
                const percent = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;
                return (
                    <td key={day} className="p-2 text-center text-[10px]">
                        <div className={`font-bold ${percent > 70 ? 'text-emerald-600' : percent > 40 ? 'text-amber-600' : 'text-slate-500'}`}>
                            {percent}%
                        </div>
                    </td>
                );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HabitGrid;
