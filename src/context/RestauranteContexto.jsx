import { createContext, useContext, useState, useEffect } from 'react';
import { produtos as produtosIniciais } from '../models/Dados';

const RestauranteContext = createContext();

const configuracoesPadrao = {
  nome: 'DiCasa Marmitaria',
  endereco: 'Rua das Flores, 123 - Centro',
  telefone: '(11) 98765-4321',
  email: 'contato@dicasa.com.br',
  horarioFuncionamento: {
    monday: { open: '11:00', close: '22:00' },
    sunday: { open: '11:00', close: '22:00' }
  },
  latitude: -23.5505,
  longitude: -46.6333,
  raioEntregaGratis: 5,
  taxaPorKm: 2.5
};

export const RestauranteProvider = ({ children }) => {
  const [produtos, setProdutos] = useState(() => {
    const salvo = localStorage.getItem('produtos-dicasa');
    return salvo ? JSON.parse(salvo) : produtosIniciais;
  });

  const [configuracoes, setConfiguracoes] = useState(() => {
    const salvo = localStorage.getItem('config-dicasa');
    return salvo ? JSON.parse(salvo) : configuracoesPadrao;
  });

  useEffect(() => {
    localStorage.setItem('produtos-dicasa', JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem('config-dicasa', JSON.stringify(configuracoes));
  }, [configuracoes]);

  const adicionarProduto = (produto) => {
    setProdutos(prev => [...prev, produto]);
  };

  const atualizarProduto = (produto) => {
    setProdutos(prev =>
      prev.map(p => (p.id === produto.id ? produto : p))
    );
  };

  const removerProduto = (produtoId) => {
    setProdutos(prev => prev.filter(p => p.id !== produtoId));
  };

  const atualizarConfiguracoes = (novasConfigs) => {
    setConfiguracoes(novasConfigs);
  };

  const calcularDistancia = (endereco) => {
    const hash = endereco
      .toLowerCase()
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const distancia = ((hash % 145) + 5) / 10;
    return Math.round(distancia * 10) / 10;
  };

  const calcularTaxaEntrega = (distancia) => {
    if (distancia <= configuracoes.raioEntregaGratis) {
      return 0;
    }

    const extra = distancia - configuracoes.raioEntregaGratis;

    return Math.round(extra * configuracoes.taxaPorKm * 100) / 100;
  };

  return (
    <RestauranteContext.Provider
      value={{
        produtos,
        configuracoes,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
        atualizarConfiguracoes,
        calcularDistancia,
        calcularTaxaEntrega
      }}
    >
      {children}
    </RestauranteContext.Provider>
  );
};

export const useRestaurante = () => {
  const context = useContext(RestauranteContext);

  if (!context) {
    throw new Error('useRestaurante deve ser usado dentro de RestauranteProvider');
  }

  return context;
};