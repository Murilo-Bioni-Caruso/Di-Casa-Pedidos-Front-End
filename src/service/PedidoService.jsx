import { getDiaAtual, OrderStatus } from "../models/Constantes";

export function adicionarPedido(pedidos, pedido) {
  return [pedido, ...pedidos];
}
export function criarPedido(dados) {
  const pedido = {
    id: `PED-${Date.now()}`,
    usuario: dados.usuario,
    itens: dados.itens,
    subtotal: dados.subtotal,
    taxaEntrega: dados.taxaEntrega,
    total: dados.total,
    metodoPagamento: dados.metodoPagamento,
    tipoEntrega: dados.tipoEntrega || 'entrega',
    data: Date.now(),
    status: OrderStatus.PENDENTE
  };
  if (dados.trocoPara !== undefined) pedido.trocoPara = dados.trocoPara;
  return pedido;
}

const TEMPO_MINIMO_ENTREGA = 40;
const TEMPO_MAXIMO_ENTREGA = 60;

function calcularHorarioEntrega(minutos) {
  const horario = new Date();
  horario.setMinutes(horario.getMinutes() + minutos);
  return horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function atualizarStatusPedido(pedidos, pedidoId, status) {
  return pedidos.map(p => {
    if (p.id !== pedidoId) return p;

    // Quando muda para "preparando", registra o horário previsto de entrega
    if (status === OrderStatus.PREPARANDO && !p.horarioEntrega) {
      return {
        ...p,
        status,
        horarioEntrega: {
          minimo: calcularHorarioEntrega(TEMPO_MINIMO_ENTREGA),
          maximo: calcularHorarioEntrega(TEMPO_MAXIMO_ENTREGA)
        }
      };
    }

    return { ...p, status };
  });
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
    const dataPedido = new Date(p.dataHora || p.data);
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
    itens: pedido.itens || [],
    dataHora: pedido.dataHora || pedido.data || null,
    data: pedido.data || pedido.dataHora || null
  };
}

//Função para obter os pedidos do localStorage, 
// normalizando cada um deles para garantir que tenham a estrutura correta.
export function obterPedidos() {
  const salvo = localStorage.getItem('pedidos-dicasa');
  const pedidos = salvo ? JSON.parse(salvo) : [];

  return pedidos.map(normalizarPedido);
}

export function calcularResumoPedido({ itens, usuario, calcularTaxaEntrega }) {
  const subtotal = itens.reduce(
    (total, item) => total + (item.precoUnitario ?? item.produto.preco) * item.quantidade,
    0
  );

  const distancia = usuario?.distancia || 0;
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