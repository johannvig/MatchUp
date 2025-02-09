import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

interface MonthDate {
    date: Date;
    day: number;  // 0 = Dimanche, 6 = Samedi
    formatted: string;
}

export function getMonthDates(year: number, month: number): MonthDate[] {
    const start: Date = startOfMonth(new Date(year, month - 1));
    const end: Date = endOfMonth(start);
    
    return eachDayOfInterval({ start, end }).map((date: Date) => ({
        date,
        day: getDay(date), 
        formatted: format(date, 'yyyy-MM-dd'),
    }));
}

