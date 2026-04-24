import { getDiaAtual, OrderStatus } from "../models/Constantes";

export function adicionarPedido(pedidos, pedido) {
  return [pedido, ...pedidos];
}
export function criarPedido(dados) {
  return {
    id: `PED-${Date.now()}`,
    usuario: dados.usuario,
    itens: dados.itens,
    subtotal: dados.subtotal,
    taxaEntrega: dados.taxaEntrega,
    total: dados.total,
    metodoPagamento: dados.metodoPagamento,
    data: Date.now(),
    status: OrderStatus.PENDENTE
  };
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

export function calcularResumoPedido({ itens, usuario, calcularTaxaEntrega, calcularDistancia }) {
  const subtotal = itens.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );

  const distancia = calcularDistancia(usuario?.endereco || '');
  const taxaEntrega = calcularTaxaEntrega(distancia);
  const total = subtotal + taxaEntrega;

  return { subtotal, taxaEntrega, total, distancia };
}
export function calcularTicketMedio(pedidos) {
  if (!pedidos.length) return 0;

  const total = pedidos.reduce((acc, p) => acc + p.total, 0);
  return total / pedidos.length;
}

export function getTotalFaturamento(pedidos) {
  return pedidos.reduce((total, p) => total + p.total, 0);
}

export function getPedidosAtivos(pedidos) {
  return pedidos.filter(
    p => p.status === 'pendente' || p.status === 'preparando'
  );
}

export function getPedidosRecentes(pedidos, limite = 10) {
  return pedidos.slice(0, limite);
}