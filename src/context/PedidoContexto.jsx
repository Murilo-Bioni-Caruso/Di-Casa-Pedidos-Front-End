import { createContext, useContext, useState, useEffect } from 'react';
import * as pedidoService from '../service/PedidoService';
import { pedidosApi } from '../api/api';
import { useRestaurante } from './RestauranteContexto';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const { calcularTaxaEntrega, calcularDistancia } = useRestaurante();

  // Busca todos os pedidos do servidor ao iniciar
  useEffect(() => {
    async function carregar() {
      try {
        const lista = await pedidosApi.listar();
        setPedidos(lista.map(pedidoService.normalizarPedido));
      } catch (erro) {
        console.error('Erro ao carregar pedidos:', erro);
      }
    }
    carregar();
  }, []);

  const criarPedidoCompleto = async ({ usuario, itens, metodoPagamento }) => {
    const resumo = pedidoService.calcularResumoPedido({
      itens,
      usuario,
      calcularTaxaEntrega,
      calcularDistancia
    });

    const dadosPedido = pedidoService.criarPedido({
      ...resumo,
      usuario,
      itens,
      metodoPagamento
    });

    const salvo = await pedidosApi.criar(dadosPedido);
    const normalizado = pedidoService.normalizarPedido(salvo);

    setPedidos(prev => [normalizado, ...prev]);
    sessionStorage.setItem('ultimo-pedido', JSON.stringify(normalizado));

    return normalizado;
  };

  const atualizarStatusPedido = async (pedidoId, status) => {
  const novosPedidos = pedidoService.atualizarStatusPedido(pedidos, pedidoId, status);
  const pedidoAtualizado = novosPedidos.find(p => p.id === pedidoId);

  try {
    await pedidosApi.atualizarStatus(pedidoId, status, pedidoAtualizado.horarioEntrega);
    setPedidos(novosPedidos);
  } catch (erro) {
    alert(`Erro ao atualizar status: ${erro.message}`);
  }
};

  const getPedidosUsuario = (telefone) =>
    pedidoService.getPedidosUsuario(pedidos, telefone);

  const getPedidoPorId = (pedidoId) =>
    pedidoService.getPedidoPorId(pedidos, pedidoId);

  const getPedidosHoje = () =>
    pedidoService.getPedidosHoje(pedidos);

  const getFaturamentoHoje = () =>
    pedidoService.getFaturamentoHoje(pedidos);

  const filtrarPedidos = (status) =>
    pedidoService.filtrarPedidos(pedidos, status);

  const contarPedidosPorStatus = (status) =>
    pedidoService.contarPedidosPorStatus(pedidos, status);

  const getResumoPedido = (itens, usuario) =>
    pedidoService.calcularResumoPedido({
      itens,
      usuario,
      calcularTaxaEntrega,
      calcularDistancia
    });

  const getTicketMedio = () =>
    pedidoService.calcularTicketMedio(pedidos);

  const getTotalFaturamento = () =>
    pedidoService.getTotalFaturamento(pedidos);

  const getPedidosAtivos = () =>
    pedidoService.getPedidosAtivos(pedidos);

  const getPedidosRecentes = () =>
    pedidoService.getPedidosRecentes(pedidos);

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        atualizarStatusPedido,
        criarPedidoCompleto,
        getResumoPedido,
        getPedidosUsuario,
        getPedidoPorId,
        getPedidosHoje,
        getFaturamentoHoje,
        filtrarPedidos,
        contarPedidosPorStatus,
        getTicketMedio,
        getTotalFaturamento,
        getPedidosAtivos,
        getPedidosRecentes,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error('usePedido deve ser usado dentro de PedidoProvider');
  }

  return context;
};