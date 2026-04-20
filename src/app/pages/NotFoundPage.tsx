// View: 404 Not Found Page
import { Link } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AlertCircle className="w-20 h-20 text-[#FF6B35] mx-auto mb-4" />
          <h1 className="text-gray-900 mb-2">Página não encontrada</h1>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Cardápio
          </Link>
        </div>
      </main>
    </div>
  );
};
