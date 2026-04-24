/**
 * Constante para representar as categorias de produtos do restaurante.
 * @constant Categoria
 * 
 */
export const Categoria = {
  MARMITAS: 'marmitas',
  ASSADOS: 'assados',
  BEBIDAS: 'bebidas',
  SOBREMESAS: 'sobremesas'
};
/**
 * @constant diasSemana
 * Constante para os dias da semana.
 */
export const diasSemana = [
  { key: 'domingo', label: 'Domingo' },
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' }
];
/** 
 * @constant getDiaAtual
 * Constante para obter o dia atual da semana em formato de string (ex: 'segunda', 'terca', etc.).
*/
export function getDiaAtual() {
  const hoje = new Date().getDay();
  return diasSemana[hoje];
}
/**
 * @constant OrderStatus
 * Constante para representar os status de um pedido.
 */
export const OrderStatus = {
    PENDENTE: 'pendente',
    PREPARANDO: 'preparando',
    PRONTO: 'pronto',
    ENTREGUE: 'entregue',
    CANCELADO: 'cancelado'
};
export const pagamentoConfig = {
  pix: 'PIX',
  cartao: 'Cartão de Crédito',
  dinheiro: 'Dinheiro'
};