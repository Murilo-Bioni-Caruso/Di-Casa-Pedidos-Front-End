import { Lock, MapPin, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useRestaurante } from '../context/RestauranteContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { getRedirectCadastro, getTextoBotao } from '../util/CadastroHelper';
import { aceitaApenasLetras, formatarTelefone } from '../util/Mascaras';
import { validarSenha } from '../util/UsuarioHelper';

export function CadastroCompletoPage() {
    const location = useLocation();
    const origem = location.state?.from;
    const navigate = useNavigate();
    const textoBotao = getTextoBotao(origem);
    const redirect = getRedirectCadastro(origem);
    const { usuario, salvarUsuario } = useUsuario();

    const [erro, setErro] = useState('');

    const [formulario, setFormulario] = useState({
        nome: usuario?.nome || '',
        telefone: usuario?.telefone || '',
        endereco: usuario?.endereco || '',
        usuario: '',
        senha: '',
        confirmarSenha: '',
        isAdmin: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔴 validações
        const erroValidacao = validarSenha(formulario.senha, formulario.confirmarSenha);
        if (erroValidacao) {
            setErro(erroValidacao);
            return;
        }
        setErro('');

        salvarUsuario({
            nome: formulario.nome,
            telefone: formulario.telefone,
            endereco: formulario.endereco,
            isAdmin: false,
            credenciais: {
                usuario: formulario.usuario,
                senha: formulario.senha
            }
        });

        navigate(redirect);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-6 max-w-2xl">

                {/* Voltar */}
                <div className="mb-6 flex items-center gap-4">
                    <h1 className="text-gray-900">Criar Conta</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">

                    {/* Nome */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <User className="w-5 h-5" />
                            Nome Completo
                        </label>

                        <input
                            type="text"
                            value={formulario.nome}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    nome: aceitaApenasLetras(e.target.value)
                                })
                            }
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <Phone className="w-5 h-5" />
                            Telefone
                        </label>

                        <Input
                            value={formulario.telefone}
                            onChange={(valor) =>
                                setFormulario({ ...formulario, telefone: valor })
                            }
                            mask={formatarTelefone}
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <MapPin className="w-5 h-5" />
                            Endereço
                        </label>

                        <Input
                            value={formulario.endereco}
                            onChange={(valor) =>
                                setFormulario({ ...formulario, endereco: valor })
                            }
                            required
                        />
                    </div>

                    {/* USUÁRIO */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <User className="w-5 h-5" />
                            Usuário
                        </label>

                        <input
                            type="text"
                            value={formulario.usuario}
                            onChange={(e) =>
                                setFormulario({ ...formulario, usuario: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* SENHA */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <Lock className="w-5 h-5" />
                            Senha
                        </label>

                        <input
                            type="password"
                            value={formulario.senha}
                            onChange={(e) =>
                                setFormulario({ ...formulario, senha: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* CONFIRMAR SENHA */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <Lock className="w-5 h-5" />
                            Confirmar Senha
                        </label>

                        <input
                            type="password"
                            value={formulario.confirmarSenha}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    confirmarSenha: e.target.value
                                })
                            }
                            className="w-full px-4 py-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* ERRO */}
                    {erro && (
                        <div className="text-red-600 text-sm">
                            {erro}
                        </div>
                    )}

                    {/* BOTÃO */}
                    <button className="w-full bg-[#FF6B35] text-white py-4 rounded-full">
                        {textoBotao}
                    </button>
                </form>
            </main>
        </div>
    );
}