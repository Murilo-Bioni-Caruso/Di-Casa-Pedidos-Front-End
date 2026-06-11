import { ArrowLeft, MapPin, Navigation, Phone, Truck, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useRestaurante } from '../context/RestauranteContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { getRedirectCadastro, getTextoBotao } from '../util/CadastroHelper';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { formatarTelefone } from '../util/Mascaras';

function montarEndereco({ rua, numero, bairro, complemento }) {
    const partes = [];
    if (rua) partes.push(numero ? `${rua}, ${numero}` : rua);
    if (bairro) partes.push(bairro);
    if (complemento) partes.push(complemento);
    return partes.join(' - ');
}

function desmontarEndereco(endereco) {
    if (!endereco) return { rua: '', numero: '', bairro: '', complemento: '', referencia: '' };
    return { rua: endereco, numero: '', bairro: '', complemento: '', referencia: '' };
}

export function CadastroPage() {
    const location = useLocation();
    const origem = location.state?.from;
    const modoConvidado = location.state?.modoConvidado;
    const navigate = useNavigate();
    const textoBotao = getTextoBotao(origem);
    const redirect = getRedirectCadastro(origem);
    const { usuario, salvarUsuario, salvarConvidado, calcularEntregaPreview } = useUsuario();
    const { configuracoes } = useRestaurante();

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [previewEntrega, setPreviewEntrega] = useState({ distancia: 0, taxaEntrega: 0 });
    const [buscandoDistancia, setBuscandoDistancia] = useState(false);
    const [buscandoLocalizacao, setBuscandoLocalizacao] = useState(false);
    const [coords, setCoords] = useState(null);

    const enderecoBase = usuario?.endereco ? desmontarEndereco(usuario.endereco) : {};

    const [formulario, setFormulario] = useState({
        nome: usuario?.nome || '',
        telefone: usuario?.telefone || '',
        rua: usuario?.rua || enderecoBase.rua || '',
        numero: usuario?.numero || '',
        bairro: usuario?.bairro || '',
        complemento: usuario?.complemento || '',
        referencia: usuario?.referencia || '',
        isAdmin: false
    });

    const enderecoCompleto = montarEndereco(formulario);

    useEffect(() => {
        if (!enderecoCompleto || enderecoCompleto.trim().length <= 10) {
            setPreviewEntrega({ distancia: 0, taxaEntrega: 0 });
            return;
        }
        setBuscandoDistancia(true);
        const timer = setTimeout(async () => {
            try {
                const resultado = await calcularEntregaPreview(enderecoCompleto + ', Indaiatuba, SP');
                setPreviewEntrega(resultado);
            } catch {
                setPreviewEntrega({ distancia: 0, taxaEntrega: 0 });
            } finally {
                setBuscandoDistancia(false);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [enderecoCompleto]);

    const handleUsarLocalizacao = () => {
        if (!navigator.geolocation) {
            setErro('Geolocalização não suportada pelo navegador.');
            return;
        }
        setBuscandoLocalizacao(true);
        setErro('');
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lon: longitude });
                try {
                    const resp = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                        { headers: { 'User-Agent': 'DiCasa-PI4' } }
                    );
                    const data = await resp.json();
                    const addr = data.address || {};
                    setFormulario(prev => ({
                        ...prev,
                        rua: addr.road || addr.street || prev.rua,
                        numero: addr.house_number || prev.numero,
                        bairro: addr.suburb || addr.neighbourhood || addr.quarter || prev.bairro,
                    }));
                } catch {
                    // mantém entrada manual
                }
                setBuscandoLocalizacao(false);
            },
            () => {
                setBuscandoLocalizacao(false);
                setErro('Não foi possível obter sua localização. Digite manualmente.');
            },
            { timeout: 10000 }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);
        try {
            const dados = {
                ...formulario,
                endereco: enderecoCompleto + ', Indaiatuba, SP',
            };
            if (modoConvidado) {
                await salvarConvidado(dados);
            } else {
                await salvarUsuario(dados);
            }
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

                <div className="mb-6 flex items-center gap-4">
                    <Link to={LINKS.CARRINHO} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-gray-900">
                        {modoConvidado ? 'Dados para entrega' : 'Seus Dados'}
                    </h1>
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
                            onChange={(e) => setFormulario({ ...formulario, nome: e.target.value })}
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
                        <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                                <MapPin className="w-4 h-4" /> Endereço de Entrega
                            </label>
                            <button
                                type="button"
                                onClick={handleUsarLocalizacao}
                                disabled={buscandoLocalizacao}
                                className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full transition-colors disabled:opacity-60"
                            >
                                <Navigation className="w-3.5 h-3.5" />
                                {buscandoLocalizacao ? 'Buscando...' : 'Usar minha localização'}
                            </button>
                        </div>

                        {/* Campos estruturados */}
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                    <label className="text-xs text-gray-500 mb-1 block">Rua / Avenida *</label>
                                    <input
                                        value={formulario.rua}
                                        onChange={(e) => setFormulario({ ...formulario, rua: e.target.value })}
                                        placeholder="Rua das Flores"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Número *</label>
                                    <input
                                        value={formulario.numero}
                                        onChange={(e) => setFormulario({ ...formulario, numero: e.target.value })}
                                        placeholder="123"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Bairro *</label>
                                <input
                                    value={formulario.bairro}
                                    onChange={(e) => setFormulario({ ...formulario, bairro: e.target.value })}
                                    placeholder="Vila Nova"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Complemento</label>
                                    <input
                                        value={formulario.complemento}
                                        onChange={(e) => setFormulario({ ...formulario, complemento: e.target.value })}
                                        placeholder="Apto 12, Bloco B"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Referência</label>
                                    <input
                                        value={formulario.referencia}
                                        onChange={(e) => setFormulario({ ...formulario, referencia: e.target.value })}
                                        placeholder="Próx. ao mercado"
                                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                    />
                                </div>
                            </div>

                            {/* Cidade/Estado fixos */}
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Cidade</label>
                                    <input value="Indaiatuba" disabled className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Estado</label>
                                    <input value="São Paulo" disabled className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">País</label>
                                    <input value="Brasil" disabled className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        {/* Preview mapa quando há coords */}
                        {coords && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                <iframe
                                    title="Mapa"
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.005}%2C${coords.lat - 0.005}%2C${coords.lon + 0.005}%2C${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`}
                                    className="w-full h-48"
                                    style={{ border: 0 }}
                                />
                                <p className="text-xs text-gray-500 px-3 py-1.5 bg-gray-50">
                                    📍 Localização detectada — ajuste os campos acima se necessário
                                </p>
                            </div>
                        )}

                        {/* Preview entrega */}
                        {buscandoDistancia && (
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-sm text-gray-500">Calculando distância...</p>
                            </div>
                        )}

                        {!buscandoDistancia && previewEntrega.distancia > 0 && (
                            <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center gap-2 text-orange-900 mb-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-semibold text-sm">Informações de Entrega</span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p>📍 Distância: <strong>{previewEntrega.distancia} km</strong></p>
                                    <p>
                                        💵 Taxa:{' '}
                                        <strong className={previewEntrega.taxaEntrega === 0 ? 'text-green-600' : 'text-orange-600'}>
                                            {previewEntrega.taxaEntrega === 0 ? 'GRÁTIS!' : formatarMoeda(previewEntrega.taxaEntrega)}
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

                    {!usuario && (
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Já tem uma conta?{' '}
                            <Link to={LINKS.LOGIN} className="text-[#FF6B35] font-medium hover:underline">
                                Fazer Login
                            </Link>
                        </p>
                    )}
                </form>
            </main>
        </div>
    );
}
