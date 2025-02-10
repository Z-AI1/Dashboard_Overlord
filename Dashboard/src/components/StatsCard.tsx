import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}% desde ontem
            </p>
          )}
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}