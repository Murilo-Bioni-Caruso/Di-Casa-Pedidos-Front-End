import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem('carrinho-dicasa');
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrinho-dicasa', JSON.stringify(itens));
  }, [itens]);

  const adicionarItem = (produto) => {
    setItens(prev => {
      const existente = prev.find(item => item.produto.id === produto.id);

      if (existente) {
        return prev.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removerItem = (produtoId) => {
    setItens(prev => prev.filter(item => item.produto.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removerItem(produtoId);
      return;
    }

    setItens(prev =>
      prev.map(item =>
        item.produto.id === produtoId
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
    localStorage.removeItem('carrinho-dicasa');
  };

  const getTotalItens = () => {
    return itens.reduce((total, item) => total + item.quantidade, 0);
  };

  const getSubtotal = () => {
    return itens.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        getTotalItens,
        getSubtotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }

  return context;
};