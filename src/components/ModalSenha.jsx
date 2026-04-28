import { useState } from "react";
import { validarSenha } from "../util/UsuarioHelper";

export const ModalSenha = ({ aberto, onClose, onSalvar }) => {
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');

    if (!aberto) return null;

    const handleSalvar = () => {
        const erroValidacao = validarSenha(senha, confirmarSenha);
        if (erroValidacao) {
            setErro(erroValidacao);
            return;
        }
        setErro('');
        onSalvar(senha);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

                <h3>Alterar senha</h3>

                <input
                    type="password"
                    placeholder="Nova senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                {erro && <span className="text-red-500 text-sm">{erro}</span>}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleSalvar}
                        className="bg-[#FF6B35] text-white px-4 py-2 rounded"
                    >
                        Salvar
                    </button>
                </div>

            </div>
        </div>
    );
};