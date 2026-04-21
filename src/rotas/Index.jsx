import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { CadastroPage } from '../pages/CadastroPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { LINKS } from './Links';
import { ConfirmacaoPage } from '../pages/ConfirmacaoPage';
import { HistoricoPedidosPage } from '../pages/HistoricoPedidosPage';

export const router = createBrowserRouter([
  {
    path: LINKS.HOME,
    element: <Layout />,
    children: [
      {
        path: LINKS.HOME,
        element: <HomePage />
      }
    ]
  },
  {
    path: LINKS.CARRINHO,
    element: <Layout />,
    children: [
      {
        path: LINKS.CARRINHO,
        element: <CarrinhoPage />
      }
    ]
  },
  {
    path: LINKS.CADASTRO,
    element: <Layout />,
    children: [
      {
        path: LINKS.CADASTRO,
        element: <CadastroPage />
      }
    ]
  },
  {
    path: LINKS.CHECKOUT,
    element: <Layout />,
    children: [
      {
        path: LINKS.CHECKOUT,
        element: <CheckoutPage />
      }
    ]
  },
    {
    path: LINKS.CONFIRMACAO,
    element: <Layout />,
    children: [
      {
        path: LINKS.CONFIRMACAO,
        element: <ConfirmacaoPage />
      }
    ]
  },
    {
    path: LINKS.HISTORICO_PEDIDOS,
    element: <Layout />,
    children: [
      {
        path: LINKS.HISTORICO_PEDIDOS,
        element: <HistoricoPedidosPage />
      }
    ]
  },


]);