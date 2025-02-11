import React, { useState, ChangeEvent, useEffect } from 'react';
import { Scissors, Users, DollarSign, TrendingUp, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from './components/StatsCard';
import BarberPerformanceChart from './components/BarberPerformanceChart';
import CutTypesChart from './components/CutTypesChart';
import { processarPerformance, processarTiposCorte } from './utils/dataHelpers';

// Declare fetchDashboardData fora do componente App
export const fetchDashboardData = async (): Promise<any[]> => {
  const response = await fetch('URL_DA_API');
  const data = await response.json();
  return data; // Retorna um array de objetos
};

type TimeFilter = 'day' | 'week' | 'month';

function App() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [activeView, setActiveView] = useState('dashboard');
  const [barbeiros, setBarbeiros] = useState<string[]>([]);
  const [novoBarbeiro, setNovoBarbeiro] = useState('');
  const [dados, setDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data: any[] = await fetchDashboardData();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 900000);
    return () => clearInterval(interval);
  }, []);

  const handleAddBarbeiro = () => {
    if (novoBarbeiro.trim()) {
      setBarbeiros([...barbeiros, novoBarbeiro.trim()]);
      setNovoBarbeiro('');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando dados...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <nav className="bg-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Overlord</h1>
            <div className="flex space-x-8">
              <motion.button onClick={() => setActiveView('dashboard')}>
                Dashboard
              </motion.button>
              <motion.button onClick={() => setActiveView('barbeiros')}>
                Barbeiros
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total de Cortes" value={156} icon={Scissors} />
              <StatsCard title="Clientes Atendidos" value={142} icon={Users} />
              <StatsCard title="Receita Total" value="R$ 4.350" icon={DollarSign} />
              <StatsCard title="Média por Dia" value={32} icon={TrendingUp} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarberPerformanceChart data={processarPerformance(dados)} />
              <CutTypesChart data={processarTiposCorte(dados)} />
            </div>
          </>
        )}

        {activeView === 'barbeiros' && (
          <motion.div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Cadastro de Barbeiros</h2>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={novoBarbeiro}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNovoBarbeiro(e.target.value)}
                placeholder="Nome completo do barbeiro"
                className="flex-1 p-3 border rounded-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleAddBarbeiro()}
              />
              <motion.button onClick={handleAddBarbeiro}>
                <PlusCircle size={18} /> Adicionar
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barbeiros.map((barbeiro, index) => (
                <motion.div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <span>{barbeiro}</span>
                  <button onClick={() => setBarbeiros(barbeiros.filter((_, i) => i !== index))}>
                    Remover
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
