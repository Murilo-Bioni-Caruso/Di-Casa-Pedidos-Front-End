/**
 * Modelo para representar as configurações do restaurante.
 * @function criarConfiguracoesRestaurante
 */
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