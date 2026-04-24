import { createContext, useContext, useState, useEffect } from 'react';
import * as pedidoService from '../service/PedidoService';
import { useRestaurante } from './RestauranteContexto';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    return pedidoService.obterPedidos();
  });

  useEffect(() => {
    localStorage.setItem('pedidos-dicasa', JSON.stringify(pedidos));
  }, [pedidos]);
  const { calcularTaxaEntrega, calcularDistancia } = useRestaurante();
  const adicionarPedido = (pedido) => {
    setPedidos(prev =>
      pedidoService.adicionarPedido(prev, pedido)
    );
  };
  const criarPedidoCompleto = ({ usuario, itens, metodoPagamento }) => {
    const resumo = pedidoService.calcularResumoPedido({
      itens,
      usuario,
      calcularTaxaEntrega,
      calcularDistancia
    });

    const pedido = pedidoService.criarPedido({
      ...resumo,
      usuario,
      itens,
      metodoPagamento
    });

    setPedidos(prev =>
      pedidoService.adicionarPedido(prev, pedido)
    );
    localStorage.setItem('ultimo-pedido', JSON.stringify(pedido));

    return pedido;
  };

  const atualizarStatusPedido = (pedidoId, status) => {
    setPedidos(prev =>
      pedidoService.atualizarStatusPedido(prev, pedidoId, status)
    );
  };

  const getPedidosUsuario = (telefone) => {
    return pedidoService.getPedidosUsuario(pedidos, telefone);
  };

  const getPedidoPorId = (pedidoId) => {
    return pedidoService.getPedidoPorId(pedidos, pedidoId);
  };

  const getPedidosHoje = () => {
    return pedidoService.getPedidosHoje(pedidos);
  };

  const getFaturamentoHoje = () => {
    return pedidoService.getFaturamentoHoje(pedidos);
  };

  const filtrarPedidos = (status) => {
    return pedidoService.filtrarPedidos(pedidos, status);
  };

  const contarPedidosPorStatus = (status) => {
    return pedidoService.contarPedidosPorStatus(pedidos, status);
  };
  const getResumoPedido = (itens, usuario) => {
    return pedidoService.calcularResumoPedido({
      itens,
      usuario,
      calcularTaxaEntrega,
      calcularDistancia
    });
  };
  const getTicketMedio = () => {
    return pedidoService.calcularTicketMedio(pedidos);
  };

  const getTotalFaturamento = () => {
    return pedidoService.getTotalFaturamento(pedidos);
  };

  const getPedidosAtivos = () => {
    return pedidoService.getPedidosAtivos(pedidos);
  };

  const getPedidosRecentes = () => {
    return pedidoService.getPedidosRecentes(pedidos);
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        adicionarPedido,
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

