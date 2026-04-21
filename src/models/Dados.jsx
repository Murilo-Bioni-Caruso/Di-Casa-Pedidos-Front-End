import { criarProduto } from "../models/Produto";

export const produtos = [
  criarProduto({
    id: '1',
    nome: 'Marmita de Frango',
    descricao: 'Frango grelhado com arroz, feijão e salada',
    preco: 25,
    categoria: 'marmitas',
    imagem: 'https://images.unsplash.com/photo-1604908176997-431ffb62f0a5',
    diaDaSemana: 'segunda'
  }),
  criarProduto({
    id: '2',
    nome: 'Marmita de Carne',
    descricao: 'Carne assada com arroz, feijão e batata',
    preco: 28,
    categoria: 'marmitas',
    imagem: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    diaDaSemana: 'terca'
  }),
  criarProduto({
    id: '3',
    nome: 'Frango Assado',
    descricao: 'Frango inteiro assado temperado',
    preco: 40,
    categoria: 'assados',
    imagem: 'https://images.unsplash.com/photo-1604908177522-402f3f61b1b4',
    diaDaSemana: 'quarta'
  }),
  criarProduto({
    id: '4',
    nome: 'Costela Assada',
    descricao: 'Costela bovina assada lentamente',
    preco: 55,
    categoria: 'assados',
    imagem: 'https://images.unsplash.com/photo-1558030006-450675393462',
    diaDaSemana: 'quinta'
  }),
  criarProduto({
    id: '5',
    nome: 'Coca-Cola',
    descricao: 'Lata 350ml gelada',
    preco: 5,
    categoria: 'bebidas',
    imagem: 'https://images.unsplash.com/photo-1580910051074-3eb694886505'
  }),
  criarProduto({
    id: '6',
    nome: 'Suco de Laranja',
    descricao: 'Suco natural 500ml',
    preco: 8,
    categoria: 'bebidas',
    imagem: 'https://images.unsplash.com/photo-1571689936114-b8c9d2c6a9b0'
  }),
  criarProduto({
    id: '7',
    nome: 'Pudim',
    descricao: 'Pudim de leite condensado',
    preco: 10,
    categoria: 'sobremesas',
    imagem: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa',
    diaDaSemana: 'sexta'
  }),
  criarProduto({
    id: '8',
    nome: 'Bolo de Chocolate',
    descricao: 'Fatia de bolo com cobertura',
    preco: 12,
    categoria: 'sobremesas',
    imagem: 'https://images.unsplash.com/photo-1599785209707-28c3e0c1c2f5'
  }),
  criarProduto({
    id: '9',
    nome: 'Marmita Fitness',
    descricao: 'Frango grelhado, batata doce e legumes',
    preco: 30,
    categoria: 'marmitas',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    diaDaSemana: 'sabado'
  }),
  criarProduto({
    id: '10',
    nome: 'Feijoada',
    descricao: 'Feijoada completa com acompanhamentos',
    preco: 35,
    categoria: 'marmitas',
    imagem: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    diaDaSemana: 'domingo'
  })
];