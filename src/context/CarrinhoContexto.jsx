import { createContext, useContext, useState } from 'react';
import * as carrinhoService from '../service/CarrinhoService';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState(() => {
    const salvo = sessionStorage.getItem('carrinho-dicasa');
    if (!salvo) return [];
    // migração: itens antigos sem cartKey/precoUnitario
    return JSON.parse(salvo).map(item => ({
      ...item,
      cartKey: item.cartKey ?? item.produto.id,
      precoUnitario: item.precoUnitario ?? item.produto.preco,
    }));
  });

  const salvar = (novosItens) => {
    sessionStorage.setItem('carrinho-dicasa', JSON.stringify(novosItens));
    setItens(novosItens);
  };

  const adicionarItem = (produto, variantesSelecionadas = null) => {
    salvar(carrinhoService.adicionarItem(itens, produto, variantesSelecionadas));
  };

  const removerItem = (cartKey) => {
    salvar(carrinhoService.removerItem(itens, cartKey));
  };

  const atualizarQuantidade = (cartKey, quantidade) => {
    salvar(carrinhoService.atualizarQuantidade(itens, cartKey, quantidade));
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
