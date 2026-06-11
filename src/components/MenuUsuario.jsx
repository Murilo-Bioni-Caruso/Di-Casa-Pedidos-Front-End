import { useState } from 'react';
import { User, LogOut, History, Settings, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LINKS } from '../rotas/Links';
import { useToast } from '../context/ToastContexto';

export function MenuUsuario({ usuario, onLogout }) {
  const [aberto, setAberto] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const { showToast } = useToast();

  const fechar = () => {
    setAberto(false);
    setConfirmando(false);
  };

  const confirmarLogout = () => {
    showToast(`Até logo, ${usuario.nome}!`);
    onLogout();
    fechar();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setAberto(!aberto)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <User className="w-6 h-6" />
      </button>

      {aberto && (
        <>
          <div className="fixed inset-0 z-40" onClick={fechar} />

          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2 text-gray-900">

            {!usuario && (
              <>
                <Link
                  to={LINKS.LOGIN}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  onClick={fechar}
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Link>

                <Link
                  to={LINKS.CADASTRO_COMPLETO}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  onClick={fechar}
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </Link>
              </>
            )}

            {usuario && (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold">{usuario.nome}</p>
                  <p className="text-sm text-gray-600">{usuario.telefone}</p>
                  {usuario.isConvidado && (
                    <span className="text-xs text-orange-600 font-medium">Convidado</span>
                  )}
                </div>

                {!usuario.isConvidado && (
                  <>
                    <Link
                      to={LINKS.HISTORICO_PEDIDOS}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      onClick={fechar}
                    >
                      <History className="w-4 h-4" />
                      Meus Pedidos
                    </Link>
                    <Link
                      to={LINKS.USUARIO_CONFIG}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      onClick={fechar}
                    >
                      <User className="w-4 h-4" />
                      Meus dados
                    </Link>
                  </>
                )}

                {usuario.isAdmin && (
                  <Link
                    to={LINKS.ADMIN}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={fechar}
                  >
                    <Settings className="w-4 h-4" />
                    Painel Admin
                  </Link>
                )}

                {!confirmando ? (
                  <button
                    onClick={() => setConfirmando(true)}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                ) : (
                  <div className="px-4 py-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-2">Tem certeza que deseja sair?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={confirmarLogout}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1.5 rounded-lg transition-colors"
                      >
                        Sim, sair
                      </button>
                      <button
                        onClick={() => setConfirmando(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-1.5 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
