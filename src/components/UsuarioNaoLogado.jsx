import { Link } from 'react-router-dom';
import { LINKS } from '../rotas/Links';

export function UsuarioNaoLogado({
  mensagem = 'Faça login para continuar',
  textoBotao = 'Fazer login'
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-gray-600">
          {mensagem}
        </p>

        <Link
          to={LINKS.CADASTRO}
          className="text-[#FF6B35] hover:underline mt-2 inline-block"
        >
          {textoBotao}
        </Link>
      </main>
    </div>
  );
}