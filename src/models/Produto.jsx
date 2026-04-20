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
