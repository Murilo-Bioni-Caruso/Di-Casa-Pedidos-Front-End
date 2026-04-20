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