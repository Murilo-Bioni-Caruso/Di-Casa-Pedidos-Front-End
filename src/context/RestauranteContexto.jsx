import { createContext, useContext, useState, useEffect } from 'react';
import * as restauranteService from '../service/RestauranteService';
import { produtosApi, configuracoesApi, mapsApi, categoriasApi } from '../api/api';

const RestauranteContext = createContext();

export const RestauranteProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [configuracoes, setConfiguracoes] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [prods, config, cats] = await Promise.all([
          produtosApi.listar(),
          configuracoesApi.obter(),
          categoriasApi.listar()
        ]);
        setProdutos(prods);
        setConfiguracoes(config);
        setCategorias(cats);
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

  // ─── CATEGORIAS ───────────────────────────────────────

  const adicionarCategoria = async (dados) => {
    const nova = await categoriasApi.criar(dados);
    setCategorias(prev => [...prev, nova].sort((a, b) => a.ordem - b.ordem));
    return nova;
  };

  const atualizarCategoria = async (categoria) => {
    const atualizada = await categoriasApi.atualizar(categoria);
    setCategorias(prev =>
      prev.map(c => c.id === atualizada.id ? atualizada : c)
          .sort((a, b) => a.ordem - b.ordem)
    );
    return atualizada;
  };

  const removerCategoria = async (id) => {
    await categoriasApi.remover(id);
    setCategorias(prev => prev.filter(c => c.id !== id));
  };

  const recarregarCategorias = async () => {
    const cats = await categoriasApi.listarTodas();
    setCategorias(cats.filter(c => c.ativo).sort((a, b) => a.ordem - b.ordem));
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

  const calcularDistancia = async (endereco) => {
    try {
      const resultado = await mapsApi.calcularDistancia(endereco);
      return resultado.distanciaKm;
    } catch {
      return restauranteService.calcularDistancia(endereco);
    }
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
        categorias,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
        adicionarCategoria,
        atualizarCategoria,
        removerCategoria,
        recarregarCategorias,
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
