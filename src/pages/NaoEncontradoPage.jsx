import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Cabecalho } from '../components/Cabecalho';
import { LINKS } from '../rotas/Links';

export function NaoEncontradoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          <AlertCircle className="w-20 h-20 text-[#FF6B35] mx-auto mb-4" />

          <h1 className="text-gray-900 mb-2">
            Página não encontrada
          </h1>

          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe.
          </p>

          <Link
            to={LINKS.HOME}
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Cardápio
          </Link>

        </div>
      </main>
    </div>
  );
}