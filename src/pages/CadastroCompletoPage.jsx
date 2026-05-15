import { Lock, MapPin, Phone, User, Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { useUsuario } from '../context/UsuarioContexto';
import { getRedirectCadastro, getTextoBotao } from '../util/CadastroHelper';
import { aceitaApenasLetras, formatarTelefone } from '../util/Mascaras';
import { validarSenha, analisarForcaSenha } from '../util/UsuarioHelper';
import { LINKS } from '../rotas/Links';

export function CadastroCompletoPage() {
    const location = useLocation();
    const origem = location.state?.from;
    const navigate = useNavigate();
    const textoBotao = getTextoBotao(origem);
    const redirect = getRedirectCadastro(origem);
    const { usuario, salvarUsuario } = useUsuario();

    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const erroRef = useRef(null);

    const [formulario, setFormulario] = useState({
        nome: usuario?.nome || '',
        telefone: usuario?.telefone || '',
        endereco: usuario?.endereco || '',
        email: usuario?.email || '',
        usuario: '',
        senha: '',
        confirmarSenha: '',
    });

    const forcaSenha = analisarForcaSenha(formulario.senha);

    useEffect(() => {
        if (erro && erroRef.current) {
            erroRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [erro]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        const erroSenha = validarSenha(formulario.senha, formulario.confirmarSenha);
        if (erroSenha) { setErro(erroSenha); return; }

        if (forcaSenha?.nivel === 'fraca') {
            setErro('Escolha uma senha mais forte antes de continuar.');
            return;
        }

        setCarregando(true);
        try {
            await salvarUsuario({
                nome: formulario.nome,
                telefone: formulario.telefone,
                endereco: formulario.endereco,
                email: formulario.email,
                isAdmin: false,
                credenciais: {
                    usuario: formulario.usuario,
                    senha: formulario.senha
                }
            });
            navigate(redirect);
        } catch (e) {
            setErro(e?.message || 'Erro ao criar conta. Verifique os dados e tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <main className="container mx-auto max-w-2xl">

                <div className="mb-6 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-gray-900">Criar Conta</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">

                    {erro && (
                        <div ref={erroRef} className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                            ⚠️ {erro}
                        </div>
                    )}

                    {/* Nome */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <User className="w-4 h-4" /> Nome Completo
                        </label>
                        <input
                            type="text"
                            value={formulario.nome}
                            onChange={(e) => setFormulario({ ...formulario, nome: aceitaApenasLetras(e.target.value) })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Phone className="w-4 h-4" /> Telefone
                        </label>
                        <Input
                            value={formulario.telefone}
                            onChange={(valor) => setFormulario({ ...formulario, telefone: valor })}
                            mask={formatarTelefone}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Mail className="w-4 h-4" /> E-mail
                        </label>
                        <input
                            type="email"
                            value={formulario.email}
                            onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <MapPin className="w-4 h-4" /> Endereço
                        </label>
                        <Input
                            value={formulario.endereco}
                            onChange={(valor) => setFormulario({ ...formulario, endereco: valor })}
                            placeholder="Rua, número, bairro"
                            required
                        />
                    </div>

                    {/* Divisor */}
                    <div className="border-t pt-2">
                        <p className="text-sm text-gray-500">Dados de acesso</p>
                    </div>

                    {/* Usuário */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <User className="w-4 h-4" /> Nome de usuário
                        </label>
                        <input
                            type="text"
                            value={formulario.usuario}
                            onChange={(e) => setFormulario({ ...formulario, usuario: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                            placeholder="Escolha um usuário"
                            required
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Lock className="w-4 h-4" /> Senha
                        </label>
                        <div className="relative">
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                value={formulario.senha}
                                onChange={(e) => setFormulario({ ...formulario, senha: e.target.value })}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                                placeholder="Crie uma senha"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {mostrarSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {forcaSenha && (
                            <div className="mt-2 space-y-1">
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: forcaSenha.largura, backgroundColor: forcaSenha.cor }}
                                        className="h-full rounded-full transition-all duration-300"
                                    />
                                </div>
                                <p style={{ color: forcaSenha.cor }} className="text-xs font-medium">
                                    Senha {forcaSenha.texto}
                                    {forcaSenha.nivel === 'fraca' && ' — adicione maiúsculas, números ou símbolos'}
                                    {forcaSenha.nivel === 'media' && ' — quase lá!'}
                                    {forcaSenha.nivel === 'forte' && ' ✓'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirmar senha */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Lock className="w-4 h-4" /> Confirmar Senha
                        </label>
                        <div className="relative">
                            <input
                                type={mostrarConfirmar ? 'text' : 'password'}
                                value={formulario.confirmarSenha}
                                onChange={(e) => setFormulario({ ...formulario, confirmarSenha: e.target.value })}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none transition-all"
                                placeholder="Repita a senha"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarConfirmar(p => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {mostrarConfirmar ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {formulario.confirmarSenha && (
                            <p className="text-xs mt-1 font-medium" style={{ color: formulario.senha === formulario.confirmarSenha ? '#22c55e' : '#ef4444' }}>
                                {formulario.senha === formulario.confirmarSenha ? '✓ Senhas coincidem' : '✗ Senhas não coincidem'}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50"
                    >
                        {carregando ? 'Criando conta...' : textoBotao}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Já tem conta?{' '}
                        <Link to={LINKS.LOGIN} className="text-[#FF6B35] font-medium hover:underline">
                            Entrar
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
}