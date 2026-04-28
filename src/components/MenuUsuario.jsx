import { useState } from 'react';
import { User, LogOut, History, Settings, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LINKS } from '../rotas/Links';

export function MenuUsuario({ usuario, onLogout }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="relative">
      {/* Botão sempre visível */}
      <button
        onClick={() => setAberto(!aberto)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <User className="w-6 h-6" />
      </button>

      {aberto && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAberto(false)}
          />

          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2 text-gray-900">

            {/* 🔴 NÃO LOGADO */}
            {!usuario && (
              <>
                <Link
                  to={LINKS.LOGIN}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  onClick={() => setAberto(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Link>

                <Link
                  to={LINKS.CADASTRO_COMPLETO}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  onClick={() => setAberto(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </Link>
              </>
            )}

            {/* 🟢 LOGADO */}
            {usuario && (
              <>
                {/* Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold">{usuario.nome}</p>
                  <p className="text-sm text-gray-600">{usuario.telefone}</p>
                </div>

                <Link
                  to={LINKS.HISTORICO_PEDIDOS}
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
                  </Link>
                )}

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
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}