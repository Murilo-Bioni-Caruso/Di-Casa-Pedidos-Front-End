export function criarUsuario({
  nome,
  telefone,
  endereco,
  distancia = 0,
}) {
  return {
    nome,
    telefone,
    endereco,
    distancia,
  };
}