import { AlertCircle, Home } from "lucide-react";
import { LINKS } from "../rotas/Links";
import { Link } from "react-router-dom";

export function NaoEncontrado({
    titulo = 'Página não encontrada',
    mensagem = 'A página que você está procurando não existe.',
    textoBotao = 'Voltar ao Cardápio',
    linkBotao = LINKS.HOME,
    icone: Icone = AlertCircle
}) {
    const IconeFinal = Icone || AlertCircle;
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
                <div className="bg-white rounded-xl shadow-lg p-8">

                    <IconeFinal className="w-20 h-20 text-[#FF6B35] mx-auto mb-4" />

                    <h1 className="text-gray-900 mb-2">
                        {titulo}
                    </h1>

                    <p className="text-gray-600 mb-8">
                        {mensagem}
                    </p>

                    <Link
                        to={linkBotao}
                        className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg"
                    >
                        <Home className="w-5 h-5" />
                        {textoBotao}
                    </Link>

                </div>
            </main>
        </div>
    );
}