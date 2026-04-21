export function formatarDataHora(data) {
  const dataObj = new Date(data);

  if (isNaN(dataObj.getTime())) {
    return 'Data inválida';
  }

  const dataFormatada = dataObj.toLocaleDateString('pt-BR');
  const horaFormatada = dataObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `${dataFormatada} às ${horaFormatada}`;
}