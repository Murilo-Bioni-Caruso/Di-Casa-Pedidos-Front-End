export function adicionarPedido(pedidos, pedido) {
  return [pedido, ...pedidos];
}

export function atualizarStatusPedido(pedidos, pedidoId, status) {
  return pedidos.map(p =>
    p.id === pedidoId ? { ...p, status } : p
  );
}

export function getPedidosUsuario(pedidos, telefone) {
  return pedidos.filter(p => p.usuario.telefone === telefone);
}

export function getPedidoPorId(pedidos, pedidoId) {
  return pedidos.find(p => p.id === pedidoId);
}

export function getPedidosHoje(pedidos) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);

  return pedidos.filter(p => {
    const dataPedido = new Date(p.dataHora);
    return dataPedido >= hoje && dataPedido < amanha;
  });
}

export function getFaturamentoHoje(pedidos) {
  const pedidosHoje = getPedidosHoje(pedidos);

  return pedidosHoje.reduce((total, p) => total + p.total, 0);
}