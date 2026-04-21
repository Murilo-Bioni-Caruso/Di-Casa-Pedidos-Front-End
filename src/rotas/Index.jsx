import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { CadastroPage } from '../pages/CadastroPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { LINKS } from './Links';
import { ConfirmacaoPage } from '../pages/ConfirmacaoPage';
import { HistoricoPedidosPage } from '../pages/HistoricoPedidosPage';
import { NaoEncontradoPage } from '../pages/NaoEncontradoPage';

export const router = createBrowserRouter([
  {
    path: LINKS.HOME,
    element: <Layout />,
    children: [
      {
        path: LINKS.HOME,
        element: <HomePage />
      },
      {
      path: LINKS.CARRINHO,
      element: <CarrinhoPage />
    },
    {
      path: LINKS.CADASTRO,
      element: <CadastroPage />
    },
    {
      path: LINKS.CHECKOUT,
      element: <CheckoutPage />
    },
    {
      path: LINKS.CONFIRMACAO,
      element: <ConfirmacaoPage />
    },
    {
      path: LINKS.HISTORICO_PEDIDOS,
      element: <HistoricoPedidosPage />
    },
    {
      path: '*',
      element: <NaoEncontradoPage/>
    }
    ]
  },



]);