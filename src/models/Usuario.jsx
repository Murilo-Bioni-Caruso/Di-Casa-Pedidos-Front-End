/**
 * Função para criar um usuário, representando a estrutura de um usuário do sistema.
 * @function criarUsuario
 * @param {Object} param0 
 * @returns o usuário
 * 
 */

export function criarUsuario({
  nome,
  telefone,
  endereco,
  distancia = 0,
  isAdmin = false,
  usuario,
  senha
}) {
  return {
    nome,
    telefone,
    endereco,
    distancia,
    isAdmin,
        credenciais: {
      usuario,
      senha
    }
  };
}