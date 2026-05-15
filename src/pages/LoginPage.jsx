import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LINKS } from '../rotas/Links';
import { useUsuario } from '../context/UsuarioContexto';
import { Lock, User, LogIn } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const { autenticar } = useUsuario();

    const [form, setForm] = useState({ usuario: '', senha: '' });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            const usuarioAutenticado = await autenticar(form.usuario, form.senha);

            if (usuarioAutenticado) {
                if (usuarioAutenticado.isAdmin) {
                    navigate(LINKS.ADMIN);
                } else {
                    navigate(LINKS.HOME);
                }
            } else {
                setErro('Usuário ou senha inválidos. Tente novamente.');
            }
        } catch {
            setErro('Erro ao conectar. Verifique se o servidor está rodando.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">

                {/* Logo / título */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-gray-900">Bem-vindo de volta</h1>
                    <p className="text-gray-500 mt-1">Entre na sua conta para continuar</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
                >
                    {/* Erro */}
                    {erro && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                            ⚠️ {erro}
                        </div>
                    )}

                    {/* Usuário */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <User className="w-4 h-4" />
                            Usuário
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            value={form.usuario}
                            onChange={(e) => setForm({ ...form, usuario: e.target.value })}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Lock className="w-4 h-4" />
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={form.senha}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Botão entrar */}
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-3 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50"
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>

                    {/* Divisor */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-sm">ou</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Criar conta */}
                    <button
                        type="button"
                        onClick={() => navigate(LINKS.CADASTRO_COMPLETO)}
                        className="w-full border-2 border-[#FF6B35] text-[#FF6B35] py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                    >
                        Criar conta
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Quer fazer um pedido sem conta?{' '}
                    <Link to={LINKS.HOME} className="text-[#FF6B35] font-medium hover:underline">
                        Ver cardápio
                    </Link>
                </p>
            </div>
        </div>
    );
}