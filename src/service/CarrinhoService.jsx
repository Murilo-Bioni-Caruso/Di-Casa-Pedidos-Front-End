export function adicionarItem(itens, produto) {
  const existente = itens.find(item => item.produto.id === produto.id);

  if (existente) {
    return itens.map(item =>
      item.produto.id === produto.id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
  }

  return [...itens, { produto, quantidade: 1 }];
}

export function removerItem(itens, produtoId) {
  return itens.filter(item => item.produto.id !== produtoId);
}

export function atualizarQuantidade(itens, produtoId, quantidade) {
  if (quantidade <= 0) {
    return removerItem(itens, produtoId);
  }

  return itens.map(item =>
    item.produto.id === produtoId
      ? { ...item, quantidade }
      : item
  );
}

export function getTotalItens(itens) {
  return itens.reduce((total, item) => total + item.quantidade, 0);
}

export function getSubtotal(itens) {
  return itens.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );
}