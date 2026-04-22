export function criarUsuario({
  nome,
  telefone,
  endereco,
  distancia = 0,
  isAdmin = false
}) {
  return {
    nome,
    telefone,
    endereco,
    distancia,
    isAdmin
  };
}