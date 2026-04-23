export function adicionarProduto(produtos, produto) {
  return [...produtos, produto];
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

export function calcularTaxaEntrega(distancia, configuracoes) {
  if (distancia <= configuracoes.raioEntregaGratis) {
    return 0;
  }

  const extra = distancia - configuracoes.raioEntregaGratis;

  return Math.round(extra * configuracoes.taxaPorKm * 100) / 100;
}