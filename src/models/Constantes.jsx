export const Categoria = {
  MARMITAS: 'marmitas',
  ASSADOS: 'assados',
  BEBIDAS: 'bebidas',
  SOBREMESAS: 'sobremesas'
};

export const diasSemana = [
  { key: 'domingo', label: 'Domingo' },
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' }
];
export function getDiaAtual() {
  const hoje = new Date().getDay();
  return diasSemana[hoje];
}

export const OrderStatus = {
    PENDENTE: 'pendente',
    PREPARANDO: 'preparando',
    PRONTO: 'pronto',
    ENTREGUE: 'entregue',
    CANCELADO: 'cancelado'
};