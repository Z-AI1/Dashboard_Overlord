import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface CutType {
  name: string;
  quantidade: number;
}

interface Props {
  data: CutType[];
}

export default function CutTypesChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Tipos de Corte</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}