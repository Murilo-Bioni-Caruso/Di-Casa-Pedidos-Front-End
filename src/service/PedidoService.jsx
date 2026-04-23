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

export function filtrarPedidos(pedidos, status) {
  if (!status || status === 'all') return pedidos;

  return pedidos.filter(p => p.status === status);
}

export function contarPedidosPorStatus(pedidos, status) {
  return pedidos.filter(p => p.status === status).length;
}

//Houve um erro na normalização dos pedidos, onde o campo "itens" estava vindo como null. 
// Essa função garante que ele seja sempre um array, evitando erros de renderização.
export function normalizarPedido(pedido) {
  return {
    ...pedido,
    itens: pedido.itens || []
  };
}

//Função para obter os pedidos do localStorage, 
// normalizando cada um deles para garantir que tenham a estrutura correta.
export function obterPedidos() {
  const salvo = localStorage.getItem('pedidos-dicasa');
  const pedidos = salvo ? JSON.parse(salvo) : [];

  return pedidos.map(normalizarPedido);
}