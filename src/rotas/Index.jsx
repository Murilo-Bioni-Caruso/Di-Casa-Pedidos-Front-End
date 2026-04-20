import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';

function Home() {
  return <h1>Página Inicial</h1>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);