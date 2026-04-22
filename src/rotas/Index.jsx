import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { CadastroPage } from '../pages/CadastroPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmacaoPage } from '../pages/ConfirmacaoPage';
import { DashboardAdminPage } from '../pages/DashboardAdminPage';
import { HistoricoPedidosPage } from '../pages/HistoricoPedidosPage';
import { HomePage } from '../pages/HomePage';
import { NaoAutorizadoPage } from '../pages/NaoAutorizadoPage';
import { NaoEncontradoPage } from '../pages/NaoEncontradoPage';
import { LINKS } from './Links';
import { AdminPedidosPage } from '../pages/AdminPedidosPage';
import { AdminCardapiosPage } from '../pages/AdminCardapiosPage';
import { AdminConfiguracoesPage } from '../pages/AdminConfiguracaoPage';
import { RotaAdmin } from './RotasAdmin';

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
        path: LINKS.NAO_AUTORIZADO,
        element: <NaoAutorizadoPage />
      },
      {
        path: '*',
        element: <NaoEncontradoPage />
      }
    ]
  },
      // Vou deixar comentado aqui, mas a rota admin só deve ser acessível para admins, abre para testes
      // {
      //   path: LINKS.ADMIN,
      //   element: <DashboardAdminPage />
      // },
      // {
      //   path: LINKS.ADMIN_PEDIDOS,
      //   element: <AdminPedidosPage />
      // },
      // {
      //   path: LINKS.ADMIN_PRODUTOS,
      //   element: <AdminCardapiosPage />
      // },
      // {
      //   path: LINKS.ADMIN_CONFIGURACOES,
      //   element: <AdminConfiguracoesPage />
      // },

  // Rota protegida para admins
  {
    path: LINKS.ADMIN,
    element: (
      <RotaAdmin />
    ),
    children: [
      {
        path: LINKS.ADMIN,
        element: <DashboardAdminPage />
      },
      {
        path: LINKS.ADMIN_PEDIDOS,
        element: <AdminPedidosPage />
      },
      {
        path: LINKS.ADMIN_PRODUTOS,
        element: <AdminCardapiosPage />
      },
      {
        path: LINKS.ADMIN_CONFIGURACOES,
        element: <AdminConfiguracoesPage />
      },
    ]
  }


]);