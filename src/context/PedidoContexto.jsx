import { createContext, useContext, useState, useEffect } from 'react';
import * as pedidoService from '../service/PedidoService';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    const salvo = localStorage.getItem('pedidos-dicasa');
    return salvo ? JSON.parse(salvo) : [];
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

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        adicionarPedido,
        atualizarStatusPedido,
        getPedidosUsuario,
        getPedidoPorId,
        getPedidosHoje,
        getFaturamentoHoje
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