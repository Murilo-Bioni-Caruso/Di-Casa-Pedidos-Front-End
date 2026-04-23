import { createContext, useContext, useState, useEffect } from 'react';
import * as pedidoService from '../service/PedidoService';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
const [pedidos, setPedidos] = useState(() => {
  return pedidoService.obterPedidos();
});

  useEffect(() => {
    localStorage.setItem('pedidos-dicasa', JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarPedido = (pedido) => {
    setPedidos(prev =>
      pedidoService.adicionarPedido(prev, pedido)
    );
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

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        adicionarPedido,
        atualizarStatusPedido,
        getPedidosUsuario,
        getPedidoPorId,
        getPedidosHoje,
        getFaturamentoHoje,
        filtrarPedidos,
        contarPedidosPorStatus
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