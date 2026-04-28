import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { Save } from 'lucide-react';
import { useUsuario } from '../context/UsuarioContexto';
import { validarSenha } from '../util/UsuarioHelper';
import { ModalSenha } from '../components/ModalSenha';

export const UsuarioConfigPage = () => {
    const { usuario, setUsuario, salvarUsuario } = useUsuario();
    const [modalSenhaAberta, setModalSenhaAberta] = useState(false);
    const [senhaAtualizada, setSenhaAtualizada] = useState(false);
    const [salvo, setSalvo] = useState(false);

    const handleChange = (campo, valor) => {
        setUsuario((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        salvarUsuario(usuario);
        setSalvo(true);
        setTimeout(() => setSalvo(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Dados do Usuário</h2>

                {salvo && (
                    <span className="text-green-600 text-sm">
                        ✓ Alterações salvas com sucesso!
                    </span>
                )}
                {senhaAtualizada && (
                    <span className="text-green-600 text-sm">
                        ✓ Senha alterada com sucesso!
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* INFORMAÇÕES DO USUÁRIO */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                    <h3 className="border-b pb-3">Informações pessoais</h3>

                    <input
                        placeholder="Nome"
                        value={usuario.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                    />

                    <input
                        placeholder="Telefone"
                        value={usuario.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                    />

                    <input
                        placeholder="Endereço"
                        value={usuario.endereco}
                        onChange={(e) => handleChange('endereco', e.target.value)}
                    />
                </div>

                {/* SENHA */}
                <button
                    type="button"
                    onClick={() => setModalSenhaAberta(true)}
                    className="text-blue-600 underline"
                >
                    Alterar senha
                </button>

                {/* BOTÃO */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg"
                    >
                        <Save className="w-5 h-5" />
                        Salvar
                    </button>
                </div>

            </form>
            <ModalSenha
                aberto={modalSenhaAberta}
                onClose={() => setModalSenhaAberta(false)}
                onSalvar={(novaSenha) => {
                    setUsuario((prev) => ({
                        ...prev,
                        senha: novaSenha
                    }));
                    setSenhaAtualizada(true);
                    setTimeout(() => setSenhaAtualizada(false), 3000);
                }}
            />
        </div>

    );
};