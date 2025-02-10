import React, { useState, ChangeEvent } from 'react';
import { Scissors, Users, DollarSign, TrendingUp, PlusCircle, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from './components/StatsCard';
import BarberPerformanceChart from './components/BarberPerformanceChart';
import CutTypesChart from './components/CutTypesChart';

type TimeFilter = 'day' | 'week' | 'month';

// Mock data
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
  const [activeView, setActiveView] = useState('dashboard');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [barbeiros, setBarbeiros] = useState<string[]>([]);
  const [novoBarbeiro, setNovoBarbeiro] = useState('');

  const handleAddBarbeiro = () => {
    if (novoBarbeiro) {
      setBarbeiros([...barbeiros, novoBarbeiro]);
      setNovoBarbeiro('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Top Navigation */}
      <nav className="bg-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Overlord</h1>
            
            <div className="flex space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  activeView === 'dashboard' ? 'text-white border-b-2 border-amber-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveView('dashboard')}
              >
                Dashboard
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  activeView === 'barbeiros' ? 'text-white border-b-2 border-amber-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveView('barbeiros')}
              >
                Barbeiros
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  activeView === 'webhook' ? 'text-white border-b-2 border-amber-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveView('webhook')}
              >
                Webhook
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                {(['day', 'week', 'month'] as TimeFilter[]).map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      timeFilter === filter
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {filter === 'day' && 'Dia'}
                    {filter === 'week' && 'Semana'}
                    {filter === 'month' && 'Mês'}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Restante do código permanece igual... */}
          </>
        )}

        {/* Seções de Barbeiros e Webhook com tipagem corrigida */}
        {activeView === 'barbeiros' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Gerenciamento de Barbeiros</h2>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                value={novoBarbeiro}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNovoBarbeiro(e.target.value)}
                placeholder="Nome do novo barbeiro"
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddBarbeiro}
                className="bg-amber-400 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Adicionar
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barbeiros.map((barbeiro, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{barbeiro}</span>
                  <div className="flex gap-2">
                    <button className="text-amber-600 hover:text-amber-700">Editar</button>
                    <button className="text-red-500 hover:text-red-600">Remover</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'webhook' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Configuração de Webhook</h2>
            <div className="max-w-2xl">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Webhook (n8n)
                </label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setWebhookUrl(e.target.value)}
                    placeholder="https://seu-webhook.n8n.io/..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-400 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  >
                    <Link size={18} />
                    Salvar URL
                  </motion.button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Configure aqui a integração com o n8n para automatizar processos e sincronizar dados.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;