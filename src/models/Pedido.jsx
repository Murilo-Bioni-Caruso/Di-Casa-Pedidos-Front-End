/**
 * Função para criar um pedido, representando a estrutura de um pedido realizado por um cliente.
 * @function criarPedido
 * @param {*} param0 
 * @returns o pedido
 */
export function criarPedido({
  id,
  usuario,
  itens,
  subtotal,
  taxaEntrega,
  total,
  metodoPagamento,
  dataHora,
  status
}) {
  return {
    id,
    usuario,
    itens,
    subtotal,
    taxaEntrega,
    total,
    metodoPagamento,
    dataHora,
    status
  };
}