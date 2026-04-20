export function criarConfiguracoesRestaurante({
  nome,
  endereco,
  telefone,
  email,
  horarioFuncionamento,
  latitude,
  longitude,
  raioEntregaGratis,
  taxaPorKm
}) {
  return {
    nome,
    endereco,
    telefone,
    email,
    horarioFuncionamento,
    latitude,
    longitude,
    raioEntregaGratis,
    taxaPorKm
  };
}