import { useState } from 'react';
import { ShoppingCart, MapPin, Clock, User, LogOut, History, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { useUsuario } from '../context/UsuarioContexto';
import { useCarrinho } from '../context/CarrinhoContexto';
import { LINKS } from '../rotas/Links';
import { MenuUsuario } from './MenuUsuario';
import { useRestaurante } from '../context/RestauranteContexto';
import { obterStatusFuncionamento } from '../util/DataEHora';


export function Cabecalho() {
    const { configuracoes } = useRestaurante();
    const { getTotalItens } = useCarrinho();
    const { usuario, limparUsuario } = useUsuario();
    const totalItems = getTotalItens();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const horarioFuncionamento = configuracoes.horarioFuncionamento;
    const horarioTexto = obterStatusFuncionamento(horarioFuncionamento)

    const handleLogout = () => {
        limparUsuario();
        setShowUserMenu(false);
    };
    return (
        <header className="sticky top-0 z-50 bg-linear-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <Link to="/" className="hover:opacity-90 transition-opacity">
                        <h1 className="text-white">{configuracoes.nome}</h1>
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* User Profile */}
                        <MenuUsuario usuario={usuario} onLogout={handleLogout} />
                        {/* Cart */}
                        <Link
                            to={LINKS.CARRINHO}
                            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FFD93D] text-[#333] w-6 h-6 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm opacity-90">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{configuracoes.endereco}</span>
                    </div>
                    {/* Ficou uma bagunça aqui, vou corrigir depois */}
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{horarioTexto}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};