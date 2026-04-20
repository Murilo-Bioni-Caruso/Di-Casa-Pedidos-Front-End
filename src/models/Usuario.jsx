export function criarUsuario({
  nome,
  telefone,
  endereco,
  distancia = 0,
  estaLogado = false
}) {
  return {
    nome,
    telefone,
    endereco,
    distancia,
    estaLogado
  };
}