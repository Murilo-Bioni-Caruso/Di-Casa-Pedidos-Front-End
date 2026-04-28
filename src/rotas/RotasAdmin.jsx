import { Navigate, Outlet } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';

export function RotaAdmin() {
  const { usuario } = useUsuario();

  // ❌ não logado
  if (!usuario) {
    return <Navigate to={LINKS.CADASTRO} />;
  }

  // ❌ não é admin
  if (!usuario.isAdmin) {
    return <Navigate to={LINKS.NAO_AUTORIZADO} />;
  }

  // ✅ liberado
  return <Outlet />;
}