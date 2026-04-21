import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { Home } from '../pages/HomePage';
import { LINKS } from './Links';

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
  }
]);