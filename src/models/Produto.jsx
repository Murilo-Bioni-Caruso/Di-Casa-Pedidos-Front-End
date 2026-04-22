/**
 * Função para criar um produto, representando a estrutura de um produto do restaurante.
 * @function criarProduto
 * @param {Object} param0 
 * @returns o produto
 */
export function criarProduto({
  id,
  nome,
  descricao,
  preco,
  categoria,
  imagem,
  diaDaSemana = null
}) {
  return {
    id,
    nome,
    descricao,
    preco,
    categoria,
    imagem,
    diaDaSemana
  };
}
