import React, { useState } from 'react';
import { Scissors, Users, DollarSign, TrendingUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import BarberPerformanceChart from './components/BarberPerformanceChart';
import CutTypesChart from './components/CutTypesChart';
import { TimeFilter } from './types';

// Mock data - replace with actual data from Google Sheets
const performanceData = [
  { date: '01/03', 'João Silva': 8, 'Pedro Santos': 6, 'Carlos Oliveira': 7 },
  { date: '02/03', 'João Silva': 10, 'Pedro Santos': 8, 'Carlos Oliveira': 9 },
  { date: '03/03', 'João Silva': 7, 'Pedro Santos': 9, 'Carlos Oliveira': 6 },
  { date: '04/03', 'João Silva': 9, 'Pedro Santos': 7, 'Carlos Oliveira': 8 },
  { date: '05/03', 'João Silva': 11, 'Pedro Santos': 10, 'Carlos Oliveira': 9 },
];

const cutTypesData = [
  { name: 'Corte Tradicional', quantidade: 45 },
  { name: 'Barba', quantidade: 30 },
  { name: 'Corte + Barba', quantidade: 25 },
  { name: 'Degradê', quantidade: 35 },
  { name: 'Platinado', quantidade: 15 },
];

function App() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFilter('day')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'day'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dia
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'week'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'month'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Mês
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Cortes"
            value={156}
            icon={Scissors}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Clientes Atendidos"
            value={142}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Receita Total"
            value="R$ 4.350"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Média por Dia"
            value={32}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarberPerformanceChart data={performanceData} />
          <CutTypesChart data={cutTypesData} />
        </div>
      </main>
    </div>
  );
}

export default App;