import { Navigate, Outlet } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { NaoEncontrado } from '../components/NaoEncontrado';
import { AlertCircle } from 'lucide-react';

export function RotaProtegida({ children }) {
    const { usuario } = useUsuario();

    if (!usuario) {
        return (
            <NaoEncontrado
                titulo='Usuário não encontrado'
                mensagem='Você precisa se identificar para continuar.'
                textoBotao='Voltar ao Cardápio'
                linkBotao={LINKS.HOME}
                icone={AlertCircle}
            />)
    }

    return <Outlet />;
}