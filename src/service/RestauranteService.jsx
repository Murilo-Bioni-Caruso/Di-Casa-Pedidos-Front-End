import { getDiaAtual } from "../models/Constantes";
import { criarProduto } from "../models/Produto";

export function adicionarProduto(produtos, dadosProduto) {
    const novoProduto = criarProduto({
        ...dadosProduto,
        id: `produto-${Date.now()}`,
        preco: parseFloat(dadosProduto.preco),
        imagem:
            dadosProduto.imagem ||
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
    });

    return [...produtos, novoProduto];
}

export function atualizarProduto(produtos, produtoAtualizado) {
    return produtos.map(p =>
        p.id === produtoAtualizado.id ? produtoAtualizado : p
    );
}

export function removerProduto(produtos, produtoId) {
    return produtos.filter(p => p.id !== produtoId);
}

// simulação de distância
export function calcularDistancia(endereco) {
    const hash = endereco
        .toLowerCase()
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const distancia = ((hash % 145) + 5) / 10;
    return Math.round(distancia * 10) / 10;
}

export function filtrarProdutos(produtos, categoria, apenasDisponiveis = false) {
    let lista = produtos;

    if (apenasDisponiveis) {
        const diaAtual = getDiaAtual().key;
        const isFimDeSemana = diaAtual === 'sabado' || diaAtual === 'domingo';

        lista = produtos.filter((p) => {
            // Regra para assados: apenas no fim de semana
            if (p.categoria === 'assados') {
                return isFimDeSemana;
            }

            // Regra para produtos com dias específicos (ex: marmitas)
            // Agora suporta array ou string única para retrocompatibilidade
            if (p.diaDaSemana) {
                if (Array.isArray(p.diaDaSemana)) {
                    return p.diaDaSemana.length === 0 || p.diaDaSemana.includes(diaAtual);
                }
                return p.diaDaSemana === diaAtual;
            }

            // Outras categorias sempre visíveis
            return true;
        });
    }

    if (!categoria || categoria === 'all') return lista;

    return lista.filter((p) => p.categoria === categoria);
}

export function getPratoDoDia(produtos) {
  const diaAtual = getDiaAtual().key;

  return produtos.find(p => {
    if (Array.isArray(p.diaDaSemana)) {
        return p.diaDaSemana.includes(diaAtual);
    }
    return p.diaDaSemana === diaAtual;
  });
}

export function calcularTaxaEntrega(distancia, configuracoes) {
    if (distancia <= configuracoes.raioEntregaGratis) {
        return 0;
    }

    const extra = distancia - configuracoes.raioEntregaGratis;

    return Math.round(extra * configuracoes.taxaPorKm * 100) / 100;
}


export function atualizarConfiguracoes(configAtual, novasConfigs) {
    return {
        ...configAtual,
        ...novasConfigs
    };
}

export function atualizarHorario(config, dia, campo, valor) {
    return {
        ...config,
        horarioFuncionamento: {
            ...config.horarioFuncionamento,
            [dia]: {
                ...config.horarioFuncionamento[dia],
                [campo]: valor
            }
        }
    };
}

export function toggleDiaFuncionamento(config, dia) {
    const atual = config.horarioFuncionamento[dia];

    return {
        ...config,
        horarioFuncionamento: {
            ...config.horarioFuncionamento,
            [dia]: atual
                ? null
                : { open: '09:00', close: '18:00' }
        }
    };
}