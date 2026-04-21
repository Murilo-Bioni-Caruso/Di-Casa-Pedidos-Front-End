import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';

function Home() {
  return <div className="bg-red-500 text-white p-4">
  Teste Tailwind
</div>;

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