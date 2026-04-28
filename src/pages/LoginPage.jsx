import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '../rotas/Links';
import { useUsuario } from '../context/UsuarioContexto';

export function LoginPage() {
    const navigate = useNavigate();
    const { autenticar } = useUsuario();

    const [form, setForm] = useState({
        usuario: '',
        senha: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioAutenticado = autenticar(form.usuario, form.senha);

        if (usuarioAutenticado) {
            if (usuarioAutenticado.isAdmin) {
                navigate(LINKS.ADMIN); // 🔥 vai pro admin
            } else {
                navigate(LINKS.HOME);
            }
        } else {
            alert('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-center text-gray-900">Login</h2>

                <input
                    type="text"
                    placeholder="Usuário"
                    value={form.usuario}
                    onChange={(e) =>
                        setForm({ ...form, usuario: e.target.value })
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={form.senha}
                    onChange={(e) =>
                        setForm({ ...form, senha: e.target.value })
                    }
                    className="w-full border p-3 rounded"
                />

                <button className="w-full bg-[#FF6B35] text-white py-3 rounded">
                    Entrar
                </button>
                <div className="text-center text-sm text-gray-600">
                    Ainda não tem conta?
                </div>

                <button
                    type="button"
                    onClick={() => navigate(LINKS.CADASTRO_COMPLETO)}
                    className="w-full border border-[#FF6B35] text-[#FF6B35] py-3 rounded hover:bg-orange-50 transition-colors"
                >
                    Criar conta
                </button>
            </form>
        </div>
    );
}