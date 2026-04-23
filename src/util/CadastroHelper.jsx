import { LINKS } from "../rotas/Links";

export function getTextoBotao(origem) {
  return origem === LINKS.CARRINHO
    ? 'Continuar para Pagamento'
    : 'Finalizar Cadastro';
}

export function getRedirectCadastro(origem) {
  return origem === LINKS.CARRINHO
    ? LINKS.CHECKOUT
    : LINKS.HOME;
}