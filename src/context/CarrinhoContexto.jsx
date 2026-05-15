import { createContext, useContext, useState } from 'react';
import * as carrinhoService from '../service/CarrinhoService';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState(() => {
    const salvo = sessionStorage.getItem('carrinho-dicasa');
    return salvo ? JSON.parse(salvo) : [];
  });

  const salvar = (novosItens) => {
    sessionStorage.setItem('carrinho-dicasa', JSON.stringify(novosItens));
    setItens(novosItens);
  };

  const adicionarItem = (produto) => {
    salvar(carrinhoService.adicionarItem(itens, produto));
  };

  const removerItem = (produtoId) => {
    salvar(carrinhoService.removerItem(itens, produtoId));
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    salvar(carrinhoService.atualizarQuantidade(itens, produtoId, quantidade));
  };

  const limparCarrinho = () => {
    sessionStorage.removeItem('carrinho-dicasa');
    setItens([]);
  };

  const getTotalItens = () => carrinhoService.getTotalItens(itens);
  const getSubtotal = () => carrinhoService.getSubtotal(itens);

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