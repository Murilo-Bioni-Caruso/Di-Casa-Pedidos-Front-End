export function criarUsuario({
  nome,
  telefone,
  endereco,
  distancia = 0,
  logado = false
}) {
  return {
    nome,
    telefone,
    endereco,
    distancia,
    logado
  };
}