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

export function obterStatusFuncionamento(horario) {
  const agora = new Date();

  const diasSemana = [
    'domingo',
    'segunda',
    'terca',
    'quarta',
    'quinta',
    'sexta',
    'sabado'
  ];

  const diaAtual = diasSemana[agora.getDay()];
  const hoje = horario[diaAtual];

  if (!hoje || hoje.closed) {
    return 'Fechado hoje';
  }

  const [horaAbertura, minAbertura] = hoje.open.split(':').map(Number);
  const [horaFechamento, minFechamento] = hoje.close.split(':').map(Number);

  const abertura = new Date();
  abertura.setHours(horaAbertura, minAbertura, 0);

  const fechamento = new Date();
  fechamento.setHours(horaFechamento, minFechamento, 0);

  if (agora >= abertura && agora <= fechamento) {
    return `🟢 Aberto agora • Fecha às ${hoje.close}`;
  }

  if (agora < abertura) {
    return `🕒 Abre às ${hoje.open}`;
  }

  return '🔴 Fechado';
}