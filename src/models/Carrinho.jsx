/**
 * Modelo para representar um item no carrinho de compras.
 * @function criarItemCarrinho
 * @param {Object} produto - O produto a ser adicionado ao carrinho.
 * @param {number} quantidade - A quantidade do produto a ser adicionada.
 * @returns {Object} Um objeto representando um item no carrinho de compras.
 */
export function criarItemCarrinho(produto, quantidade) {
  return {
    produto,
    quantidade
  };
}