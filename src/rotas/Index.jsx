import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { Home } from '../pages/HomePage';
import { LINKS } from './Links';
import { Carrinho } from '../pages/CarrinhoPage';
import { Cadastro } from '../pages/CadastroPage';

export const router = createBrowserRouter([
  {
    path: LINKS.HOME,
    element: <Layout />,
    children: [
      {
        path: LINKS.HOME,
        element: <Home/>
      }
    ]
  },
    {
    path: LINKS.CARRINHO,
    element: <Layout />,
    children: [
      {
        path: LINKS.CARRINHO,
        element: <Carrinho/>
      }
    ]
  },
  {
    path: LINKS.CADASTRO,
    element: <Layout />,
    children: [
      {
        path: LINKS.CADASTRO,
        element: <Cadastro/>
      }
    ]
  },
  
]);