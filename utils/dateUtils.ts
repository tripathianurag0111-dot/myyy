
export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const getMonthName = (month: number): string => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2026, month, 1));
};

export const getDayAbbreviation = (day: number, month: number, year: number): string => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(year, month, day));
};
