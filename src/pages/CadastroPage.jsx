import { ArrowLeft, MapPin, Phone, Truck, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useRestaurante } from '../context/RestauranteContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { getRedirectCadastro, getTextoBotao } from '../util/CadastroHelper';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { aceitaApenasLetras, formatarTelefone } from '../util/Mascaras';

export function CadastroPage() {
    const location = useLocation();
    const origem = location.state?.from;
    const navigate = useNavigate();
    const textoBotao = getTextoBotao(origem);
    const redirect = getRedirectCadastro(origem);
    const { usuario, salvarUsuario, calcularEntregaPreview } = useUsuario();
    const { configuracoes } = useRestaurante();

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const [formulario, setFormulario] = useState({
        nome: usuario?.nome || '',
        telefone: usuario?.telefone || '',
        endereco: usuario?.endereco || '',
        isAdmin: false
    });

    const { distancia, taxaEntrega } = calcularEntregaPreview(formulario.endereco);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            await salvarUsuario(formulario);
            navigate(redirect);
        } catch {
            setErro('Erro ao salvar dados. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-6 max-w-2xl">

                {/* Voltar */}
                <div className="mb-6 flex items-center gap-4">
                    <Link to={LINKS.CARRINHO} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-gray-900">Seus Dados</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">

                    {erro && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
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
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Phone className="w-4 h-4" /> Telefone
                        </label>
                        <Input
                            placeholder="(00) 00000-0000"
                            value={formulario.telefone}
                            onChange={(valor) => setFormulario({ ...formulario, telefone: valor })}
                            mask={formatarTelefone}
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <MapPin className="w-4 h-4" /> Endereço de Entrega
                        </label>
                        <Input
                            placeholder="Rua, número, bairro"
                            value={formulario.endereco}
                            onChange={(valor) => setFormulario({ ...formulario, endereco: valor })}
                            required
                        />

                        {distancia > 0 && (
                            <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center gap-2 text-orange-900 mb-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-semibold text-sm">Informações de Entrega</span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p>📍 Distância: <strong>{distancia} km</strong></p>
                                    <p>
                                        💵 Taxa:{' '}
                                        <strong className={taxaEntrega === 0 ? 'text-green-600' : 'text-orange-600'}>
                                            {taxaEntrega === 0 ? 'GRÁTIS!' : formatarMoeda(taxaEntrega)}
                                        </strong>
                                    </p>
                                    <p className="text-gray-500">💡 Até {configuracoes.raioEntregaGratis} km é grátis</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50"
                    >
                        {carregando ? 'Salvando...' : textoBotao}
                    </button>

                </form>
            </main>
        </div>
    );
}