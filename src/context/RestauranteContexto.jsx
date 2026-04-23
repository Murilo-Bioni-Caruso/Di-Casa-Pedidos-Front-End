import { createContext, useContext, useState, useEffect } from 'react';
import { produtos as produtosIniciais } from '../models/Dados';
import * as restauranteService from '../service/RestauranteService';

const RestauranteContext = createContext();

const configuracoesPadrao = {
  nome: 'DiCasa Marmitaria',
  endereco: 'Rua das Flores, 123 - Centro',
  telefone: '(11) 98765-4321',
  email: 'contato@dicasa.com.br',
  horarioFuncionamento: {
    domingo: { open: '11:00', close: '22:00' },
    segunda: { open: '11:00', close: '22:00' }
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

  // ✅ PRODUTOS (agora usando service)

  const adicionarProduto = (produto) => {
    setProdutos(prev =>
      restauranteService.adicionarProduto(prev, produto)
    );
  };

  const filtrarProdutos = (categoria) => {
    return restauranteService.filtrarProdutos(produtos, categoria);
  };

  const atualizarProduto = (produto) => {
    setProdutos(prev =>
      restauranteService.atualizarProduto(prev, produto)
    );
  };

  const removerProduto = (produtoId) => {
    setProdutos(prev =>
      restauranteService.removerProduto(prev, produtoId)
    );
  };

  // ✅ CONFIG

  const atualizarConfiguracoes = (novasConfigs) => {
    const atualizado = restauranteService.atualizarConfiguracoes(
      configuracoes,
      novasConfigs
    );

    setConfiguracoes(atualizado);
  };

  // ✅ REGRAS (delegadas ao service)

  const calcularDistancia = (endereco) => {
    return restauranteService.calcularDistancia(endereco);
  };

  const calcularTaxaEntrega = (distancia) => {
    return restauranteService.calcularTaxaEntrega(distancia, configuracoes);
  };
  const atualizarHorario = (dia, campo, valor) => {
    const atualizado = restauranteService.atualizarHorario(
      configuracoes,
      dia,
      campo,
      valor
    );

    setConfiguracoes(atualizado);
  };

  const toggleDiaFuncionamento = (dia) => {
    const atualizado = restauranteService.toggleDiaFuncionamento(
      configuracoes,
      dia
    );

    setConfiguracoes(atualizado);
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
        calcularTaxaEntrega,
        filtrarProdutos,
        atualizarHorario,
        toggleDiaFuncionamento
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