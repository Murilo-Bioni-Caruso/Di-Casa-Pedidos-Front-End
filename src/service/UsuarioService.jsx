import { gerarSenha, gerarUsername } from "../util/UsuarioHelper";

const STORAGE_KEY = 'usuario-dicasa';

const ADMIN = {
  nome: 'Administrador',
  isAdmin: true,
  credenciais: {
    usuario: 'admin',
    senha: 'admin'
  }
};

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
    const { distancia, taxaEntrega } = this.calcularEntrega(
      dados.endereco,
      calcularDistancia,
      calcularTaxaEntrega
    );

    const username = dados.credenciais?.usuario || gerarUsername(dados.nome);
    const senha = dados.credenciais?.senha || gerarSenha();

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
  autenticarUsuario(usuario, senha) {
    if (
      usuario === ADMIN.credenciais.usuario &&
      senha === ADMIN.credenciais.senha
    ) {
      return ADMIN;
    }
    const salvo = this.obterUsuario();

    if (
      salvo?.credenciais?.usuario === usuario &&
      salvo?.credenciais?.senha === senha
    ) {
      return salvo;
    }

    return null;
  }
};