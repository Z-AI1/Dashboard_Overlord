import axios from 'axios';

const API_URL = 'https://seu-n8n.io/webhook/dashboard-data';

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(API_URL, {
      auth: { // Se tiver autenticação
        username: 'usuario',
        password: 'senha'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
};