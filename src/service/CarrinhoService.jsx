export function getCartKey(produto, variantesSelecionadas) {
  if (!variantesSelecionadas || variantesSelecionadas.length === 0) {
    return produto.id;
  }
  const varKey = variantesSelecionadas
    .map(v => `${v.label}:${v.opcaoNome}`)
    .join('|');
  return `${produto.id}-${varKey}`;
}

export function getPrecoUnitario(produto, variantesSelecionadas) {
  const precoBase = Number(produto.preco) || 0;
  if (!variantesSelecionadas || variantesSelecionadas.length === 0) {
    return precoBase;
  }
  const varianteComPreco = variantesSelecionadas.find(v => Number.isFinite(v.preco));
  if (varianteComPreco) {
    return varianteComPreco.preco;
  }
  const extra = variantesSelecionadas.reduce((sum, v) => sum + (v.precoExtra || 0), 0);
  return precoBase + extra;
}

export function adicionarItem(itens, produto, variantesSelecionadas = null) {
  const cartKey = getCartKey(produto, variantesSelecionadas);
  const precoUnitario = getPrecoUnitario(produto, variantesSelecionadas);
  const existente = itens.find(item => item.cartKey === cartKey);

  if (existente) {
    return itens.map(item =>
      item.cartKey === cartKey
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
  }

  return [...itens, { produto, quantidade: 1, variantesSelecionadas, precoUnitario, cartKey }];
}

export function removerItem(itens, cartKey) {
  return itens.filter(item => item.cartKey !== cartKey);
}

export function atualizarQuantidade(itens, cartKey, quantidade) {
  if (quantidade <= 0) {
    return removerItem(itens, cartKey);
  }
  return itens.map(item =>
    item.cartKey === cartKey
      ? { ...item, quantidade }
      : item
  );
}

export function getTotalItens(itens) {
  return itens.reduce((total, item) => total + item.quantidade, 0);
}

export function getSubtotal(itens) {
  return itens.reduce(
    (total, item) => total + (item.precoUnitario ?? item.produto.preco) * item.quantidade,
    0
  );
}
