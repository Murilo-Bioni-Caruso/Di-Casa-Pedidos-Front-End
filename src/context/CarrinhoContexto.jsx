import { createContext, useContext, useState, useEffect } from 'react';
import * as carrinhoService from '../service/CarrinhoService';

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
    setItens(prev => carrinhoService.adicionarItem(prev, produto));
  };

  const removerItem = (produtoId) => {
    setItens(prev => carrinhoService.removerItem(prev, produtoId));
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    setItens(prev =>
      carrinhoService.atualizarQuantidade(prev, produtoId, quantidade)
    );
  };

  const limparCarrinho = () => {
    setItens([]);
    localStorage.removeItem('carrinho-dicasa');
  };

  const getTotalItens = () => {
    return carrinhoService.getTotalItens(itens);
  };

  const getSubtotal = () => {
    return carrinhoService.getSubtotal(itens);
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