import { Link, useLocation } from 'react-router-dom';
import {
  Home,
} from 'lucide-react';
import { LINKS } from '../rotas/Links';
import { useRestaurante } from '../context/RestauranteContexto';
import { layoutNavegacaoAdmin } from '../util/LayoutNavegacaoAdmin';

export function LayoutAdmin({ children }) {
  const { configuracoes } = useRestaurante();
  const location = useLocation();

  const estaAtivo = (caminho) => {
    if (caminho === LINKS.ADMIN) {
      return location.pathname === caminho;
    }
    return location.pathname.startsWith(caminho);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-linear-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-1">Painel Administrativo</h1>
              <p className="text-sm opacity-90">{configuracoes.nome}</p>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Ver Site</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navegação */}
        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {layoutNavegacaoAdmin.map((item) => {
            const Icone = item.icone;
            const ativo = estaAtivo(item.caminho);

            return (
              <Link
                key={item.caminho}
                to={item.caminho}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${
                    ativo
                      ? 'bg-[#FF6B35] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icone className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Conteúdo */}
        {children}
      </div>
    </div>
  );
}