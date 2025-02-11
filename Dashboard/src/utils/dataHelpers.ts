export const processarPerformance = (dados: any[]) => {
  return dados.reduce((acc: any[], item) => {
    const existingDate = acc.find(e => e.date === item.date);
    existingDate 
      ? existingDate[item.barbeiro] = (existingDate[item.barbeiro] || 0) + 1
      : acc.push({ date: item.date, [item.barbeiro]: 1 });
    return acc;
  }, []);
};

export const processarTiposCorte = (dados: any[]) => {
  return dados.reduce((acc: any[], item) => {
    const existingService = acc.find(e => e.name === item.servico);
    existingService 
      ? existingService.quantidade++ 
      : acc.push({ name: item.servico, quantidade: 1 });
    return acc;
  }, []);
};