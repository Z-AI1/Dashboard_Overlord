import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface BarberPerformance {
  date: string;
  [key: string]: string | number;
}

interface Props {
  data: BarberPerformance[];
}

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function BarberPerformanceChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Desempenho dos Barbeiros</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0] || {})
              .filter(key => key !== 'date')
              .map((barber, index) => (
                <Line
                  key={barber}
                  type="monotone"
                  dataKey={barber}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}