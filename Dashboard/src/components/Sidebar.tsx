import React from 'react';
import { BarChart3, Users, Calendar, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center space-x-3 mb-10">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=60"
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold">Barbearia Pro</h1>
      </div>
      
      <nav className="space-y-6">
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
          <BarChart3 className="w-5 h-5" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
          <Users className="w-5 h-5" />
          <span>Barbeiros</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
          <Calendar className="w-5 h-5" />
          <span>Agendamentos</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </a>
      </nav>

      <div className="absolute bottom-6 left-6">
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}