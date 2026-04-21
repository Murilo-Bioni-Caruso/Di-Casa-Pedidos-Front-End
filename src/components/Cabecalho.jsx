// View Component: Header
import { useState } from 'react';
import { ShoppingCart, MapPin, Clock, User, LogOut, History, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { useUsuario } from '../context/UsuarioContexto';
import { useCarrinho } from '../context/CarrinhoContexto';
import { LINKS } from '../rotas/Links';


export function Cabecalho() {
    const { getTotalItens } = useCarrinho();
    const { usuario, limparUsuario } = useUsuario();
    const totalItems = getTotalItens();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        limparUsuario();
        setShowUserMenu(false);
    };
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <Link to="/" className="hover:opacity-90 transition-opacity">
                        <h1 className="text-white">DiCasa Marmitaria</h1>
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* User Profile */}
                        {usuario && usuario.estaLogado && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="User menu"
                                >
                                    <User className="w-6 h-6" />
                                </button>

                                {showUserMenu && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowUserMenu(false)}
                                        />

                                        {/* Dropdown */}
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 py-2 text-gray-900">
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <p className="font-semibold">{usuario.nome}</p>
                                                <p className="text-sm text-gray-600">{usuario.telefone}</p>
                                                <p className="text-xs text-gray-500 mt-1">{usuario.endereco}</p>
                                            </div>

                                            <Link
                                                to="/orders"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <History className="w-4 h-4" />
                                                <span>Meus Pedidos</span>
                                            </Link>

                                            <Link
                                                to={LINKS.ADMIN}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Painel Admin</span>
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Sair</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

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
                        <span>Rua das Flores, 123 - Centro</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Segunda a Domingo: 11:00 - 22:00</span>
                    </div>
                </div>
            </div>
        </header>
    );
};