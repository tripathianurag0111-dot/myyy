
import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { Habit, HabitLog, Category } from '../types';
import { getDaysInMonth, formatDate } from '../utils/dateUtils';

interface DashboardProps {
  currentMonth: number;
  currentYear: number;
  habits: Habit[];
  logs: Record<string, HabitLog>;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'];

const Dashboard: React.FC<DashboardProps> = ({ currentMonth, currentYear, habits, logs }) => {
  const daysInMonth = useMemo(() => getDaysInMonth(currentMonth, currentYear), [currentMonth, currentYear]);
  
  // Daily Completion Data
  const dailyData = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = formatDate(new Date(currentYear, currentMonth, day));
      const completed = habits.filter(h => logs[`${h.id}-${dateStr}`]?.completed).length;
      const percent = habits.length ? (completed / habits.length) * 100 : 0;
      return { day, percent, completed };
    });
  }, [currentMonth, currentYear, habits, logs, daysInMonth]);

  // Category Completion Data
  const categoryData = useMemo(() => {
    const categories = Object.values(Category);
    return categories.map(cat => {
      const catHabits = habits.filter(h => h.category === cat);
      let totalLogs = 0;
      let completedLogs = 0;
      
      catHabits.forEach(h => {
        for (let d = 1; d <= daysInMonth; d++) {
          const dateStr = formatDate(new Date(currentYear, currentMonth, d));
          totalLogs++;
          if (logs[`${h.id}-${dateStr}`]?.completed) completedLogs++;
        }
      });

      return {
        name: cat,
        value: completedLogs,
        total: totalLogs,
        percent: totalLogs ? Math.round((completedLogs / totalLogs) * 100) : 0
      };
    }).filter(d => d.total > 0);
  }, [currentMonth, currentYear, habits, logs, daysInMonth]);

  // Overall Statistics
  const stats = useMemo(() => {
    let totalPossible = habits.length * daysInMonth;
    // FIX: Explicitly type 'l' as HabitLog to resolve 'unknown' property access errors (lines 62, 63)
    let totalCompleted = Object.values(logs).filter((l: HabitLog) => {
      const logDate = new Date(l.date);
      return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear && l.completed;
    }).length;

    return {
      completionRate: totalPossible ? Math.round((totalCompleted / totalPossible) * 100) : 0,
      totalCompleted,
      totalPossible
    };
  }, [currentMonth, currentYear, habits, logs, daysInMonth]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm font-medium mb-1">Monthly Completion Rate</span>
          <span className="text-4xl font-black text-indigo-600">{stats.completionRate}%</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm font-medium mb-1">Tasks Completed</span>
          <span className="text-4xl font-black text-emerald-600">{stats.totalCompleted}</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-slate-500 text-sm font-medium mb-1">Target Tasks</span>
          <span className="text-4xl font-black text-slate-400">{stats.totalPossible}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Completion %</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="percent" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Category Distribution</h3>
          <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
