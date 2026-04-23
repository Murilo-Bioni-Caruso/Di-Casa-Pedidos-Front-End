const STORAGE_KEY = 'usuario-dicasa';

export const UsuarioService = {
  obterUsuario() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : null;
  },

  salvarUsuario(usuario) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    return usuario;
  },

  limparUsuario() {
    localStorage.removeItem(STORAGE_KEY);
  },

  criarUsuario(dados, calcularDistancia, calcularTaxaEntrega) {
    const enderecoValido = dados.endereco?.trim().length > 10;

    let distancia = 0;
    let taxaEntrega = 0;

    if (enderecoValido) {
      distancia = calcularDistancia(dados.endereco);
      taxaEntrega = calcularTaxaEntrega(distancia);
    }

    return {
      ...dados,
      distancia,
      taxaEntrega,
      logado: true
    };
  }
};