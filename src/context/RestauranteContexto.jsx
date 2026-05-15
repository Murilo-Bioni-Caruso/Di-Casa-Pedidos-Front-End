import { createContext, useContext, useState, useEffect } from 'react';
import * as restauranteService from '../service/RestauranteService';
import { produtosApi, configuracoesApi } from '../api/api';

const RestauranteContext = createContext();

export const RestauranteProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [configuracoes, setConfiguracoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Busca produtos e configurações do servidor ao iniciar
  useEffect(() => {
    async function carregar() {
      try {
        const [prods, config] = await Promise.all([
          produtosApi.listar(),
          configuracoesApi.obter()
        ]);
        setProdutos(prods);
        setConfiguracoes(config);
      } catch (erro) {
        console.error('Erro ao carregar dados do servidor:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // ─── PRODUTOS ─────────────────────────────────────────

  const adicionarProduto = async (dadosProduto) => {
    const novo = await produtosApi.criar({
      ...dadosProduto,
      preco: parseFloat(dadosProduto.preco),
      imagem: dadosProduto.imagem ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
    });
    setProdutos(prev => [...prev, novo]);
  };

  const atualizarProduto = async (produto) => {
    const atualizado = await produtosApi.atualizar(produto);
    setProdutos(prev => prev.map(p => p.id === atualizado.id ? atualizado : p));
  };

  const removerProduto = async (produtoId) => {
    await produtosApi.remover(produtoId);
    setProdutos(prev => prev.filter(p => p.id !== produtoId));
  };

  const filtrarProdutos = (categoria, apenasDisponiveis = false) => {
    const aplicarFiltroDia = apenasDisponiveis && configuracoes?.filtrarPorDia;
    return restauranteService.filtrarProdutos(produtos, categoria, aplicarFiltroDia);
  };

  const getPratoDoDia = () => {
    return restauranteService.getPratoDoDia(produtos);
  };

  // ─── CONFIGURAÇÕES ────────────────────────────────────

  const atualizarConfiguracoes = async (novasConfigs) => {
    const atualizado = restauranteService.atualizarConfiguracoes(
      configuracoes,
      novasConfigs
    );
    const salvo = await configuracoesApi.atualizar(atualizado);
    setConfiguracoes(salvo);
  };

  const atualizarHorario = async (dia, campo, valor) => {
    const atualizado = restauranteService.atualizarHorario(
      configuracoes,
      dia,
      campo,
      valor
    );
    const salvo = await configuracoesApi.atualizar(atualizado);
    setConfiguracoes(salvo);
  };

  const toggleDiaFuncionamento = async (dia) => {
    const atualizado = restauranteService.toggleDiaFuncionamento(
      configuracoes,
      dia
    );
    const salvo = await configuracoesApi.atualizar(atualizado);
    setConfiguracoes(salvo);
  };

  // ─── REGRAS ───────────────────────────────────────────

  const calcularDistancia = (endereco) => {
    return restauranteService.calcularDistancia(endereco);
  };

  const calcularTaxaEntrega = (distancia) => {
    return restauranteService.calcularTaxaEntrega(distancia, configuracoes);
  };

  if (carregando) return null;

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
        toggleDiaFuncionamento,
        getPratoDoDia
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