import { gerarSenha, gerarUsername } from "../util/UsuarioHelper";

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

  criarUsuarioSimples(dados, calcularDistancia, calcularTaxaEntrega) {
      const { distancia, taxaEntrega } = this.calcularEntrega(
    dados.endereco,
    calcularDistancia,
    calcularTaxaEntrega
  );

    const username = gerarUsername(dados.nome);
    const senha = gerarSenha();

    return {
      ...dados,
      nome: dados.nome || '',
      distancia,
      taxaEntrega,
      isAdmin: false,
      credenciais: {
        usuario: username,
        senha
      }
    };
  },
  calcularEntrega(endereco, calcularDistancia, calcularTaxaEntrega) {
    const enderecoValido = endereco?.trim().length > 10;

    if (!enderecoValido) {
      return { distancia: 0, taxaEntrega: 0 };
    }

    const distancia = calcularDistancia(endereco);
    const taxaEntrega = calcularTaxaEntrega(distancia);

    return { distancia, taxaEntrega };
  },
  autenticarUsuario(usuarios, usuario, senha) {
    return usuarios.find(
      u =>
        u.credenciais.usuario === usuario &&
        u.credenciais.senha === senha
    );
  }
};