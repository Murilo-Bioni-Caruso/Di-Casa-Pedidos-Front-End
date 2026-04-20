import { criarProduto } from "./Produto";


export const produtos = [
  criarProduto({
    id: '1',
    nome: 'Marmita de Frango',
    descricao: 'Frango com arroz e feijão',
    preco: 25,
    categoria: 'marmitas',
    imagem: '/img/frango.png'
  }),
  criarProduto({
    id: '2',
    nome: 'Coca-Cola',
    descricao: 'Lata 350ml',
    preco: 5,
    categoria: 'bebidas',
    imagem: '/img/coca.png'
  })
];