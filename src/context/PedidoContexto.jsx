import { createContext, useContext, useState, useEffect } from 'react';

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
    setPedidos(prev => [pedido, ...prev]);
  };

  const atualizarStatusPedido = (pedidoId, status) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === pedidoId ? { ...p, status } : p
      )
    );
  };

  const getPedidosUsuario = (email) => {
    return pedidos.filter(p => p.usuario.email === email);
  };

  const getPedidoPorId = (pedidoId) => {
    return pedidos.find(p => p.id === pedidoId);
  };

  const getPedidosHoje = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    return pedidos.filter(p => {
      const dataPedido = new Date(p.dataHora);
      return dataPedido >= hoje && dataPedido < amanha;
    });
  };

  const getFaturamentoHoje = () => {
    return getPedidosHoje().reduce((total, p) => total + p.total, 0);
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