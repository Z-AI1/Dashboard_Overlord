export interface Barber {
  id: number;
  name: string;
  avatar: string;
}

export interface Cut {
  id: number;
  barberId: number;
  clientName: string;
  cutType: string;
  date: string;
  price: number;
}

export type TimeFilter = 'day' | 'week' | 'month';

export interface DashboardStats {
  totalCuts: number;
  totalRevenue: number;
  averageCutsPerDay: number;
}