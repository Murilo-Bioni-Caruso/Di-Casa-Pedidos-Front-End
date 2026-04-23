import { ArrowLeft, MapPin, Phone, Truck, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRestaurante } from '../context/RestauranteContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { aceitaApenasLetras, formatarTelefone } from '../util/Mascaras';


export function CadastroPage() {
    const location = useLocation();
    const origem = location.state?.from;
    const navigate = useNavigate();
    const textoBotao =
        origem === LINKS.CARRINHO
            ? 'Continuar para Pagamento'
            : 'Finalizar Cadastro';
    const { usuario, salvarUsuario, calcularEntregaPreview } = useUsuario();
    const { configuracoes } = useRestaurante();

    const [formulario, setFormulario] = useState({
        nome: usuario?.nome || '',
        telefone: usuario?.telefone || '',
        endereco: usuario?.endereco || '',
        isAdmin: false
    });

    const [distancia, setDistancia] = useState(0);
    const [taxaEntrega, setTaxaEntrega] = useState(0);

    
    useEffect(() => {
        const preview = calcularEntregaPreview(formulario.endereco);

        setDistancia(preview.distancia);
        setTaxaEntrega(preview.taxaEntrega);
    }, [formulario.endereco]);

    const handleSubmit = (e) => {
        e.preventDefault();

        salvarUsuario(formulario);

        navigate(origem === LINKS.CARRINHO ? LINKS.CHECKOUT : LINKS.HOME);
    };
    return (
        <div className="min-h-screen bg-gray-50">

            <main className="container mx-auto px-4 py-6 max-w-2xl">

                {/* Voltar */}
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        to={LINKS.CARRINHO}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>

                    <h1 className="text-gray-900">Seus Dados</h1>
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
                            onChange={(e) => {
                                const apenasLetras = aceitaApenasLetras(e.target.value);
                                setFormulario({ ...formulario, nome: apenasLetras })
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none"
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <Phone className="w-5 h-5" />
                            Telefone
                        </label>

                        <input
                            type="text"
                            value={formulario.telefone}
                            onChange={(e) => {
                                const telefoneFormatado = formatarTelefone(e.target.value);
                                setFormulario({ ...formulario, telefone: telefoneFormatado })
                            }
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none"
                            placeholder="Digite seu telefone"
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                            <MapPin className="w-5 h-5" />
                            Endereço de Entrega
                        </label>

                        <input
                            type="text"
                            value={formulario.endereco}
                            onChange={(e) =>
                                setFormulario({ ...formulario, endereco: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none"
                            placeholder="Rua, número, bairro"
                            required
                            minLength={10}
                        />

                        {/* Info entrega */}
                        {distancia > 0 && (
                            <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">

                                <div className="flex items-center gap-2 text-orange-900 mb-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-semibold">Informações de Entrega</span>
                                </div>

                                <div className="space-y-1 text-sm">
                                    <p>
                                        📍 Distância: <strong>{distancia} km</strong>
                                    </p>

                                    <p>
                                        💵 Taxa:{' '}
                                        <strong className={taxaEntrega === 0 ? 'text-green-600' : 'text-orange-600'}>
                                            {taxaEntrega === 0 ? 'GRÁTIS!' : formatarMoeda(taxaEntrega)}
                                        </strong>
                                    </p>

                                    <p className="text-gray-600 mt-2">
                                        💡 Até {configuracoes.raioEntregaGratis} km é grátis
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                        className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg"
                    >
                        {textoBotao}
                    </button>

                </form>
            </main>
        </div>
    );
}