import { Cabecalho } from '../components/Cabecalho';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Cabecalho />
      <Outlet />
    </>
  );
}
