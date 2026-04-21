import { useState } from 'react';
import { User, LogOut, History, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LINKS } from '../rotas/Links';

export function MenuUsuario({ usuario, onLogout }) {
  const [aberto, setAberto] = useState(false);

  if (!usuario ) return null;

  return (
    <div className="relative">
      {/* Botão */}
      <button
        onClick={() => setAberto(!aberto)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Menu do usuário"
      >
        <User className="w-6 h-6" />
      </button>

      {aberto && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAberto(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2 text-gray-900">
            
            {/* Info do usuário */}
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="font-semibold">{usuario.nome}</p>
              <p className="text-sm text-gray-600">{usuario.telefone}</p>
              <p className="text-xs text-gray-500 mt-1">{usuario.endereco}</p>
            </div>

            {/* Links */}
            <Link
              to="/orders"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              onClick={() => setAberto(false)}
            >
              <History className="w-4 h-4" />
              Meus Pedidos
            </Link>

            {usuario.isAdmin && (
              <Link
                to={LINKS.ADMIN}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setAberto(false)}
              >
                <Settings className="w-4 h-4" />
              Painel Admin
            </Link>)}

            {/* Logout */}
            <button
              onClick={() => {
                onLogout();
                setAberto(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}