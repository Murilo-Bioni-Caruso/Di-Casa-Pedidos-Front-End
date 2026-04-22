import { Lock } from "lucide-react";
import { NaoEncontrado } from "../components/NaoEncontrado";

export function NaoAutorizadoPage() {
    return (
        <NaoEncontrado
            titulo="Acesso negado"
            mensagem="Você não tem permissão para acessar esta página."
            textoBotao="Voltar para início"
            linkBotao={LINKS.HOME}
            icone={Lock}
        />
    )
}
