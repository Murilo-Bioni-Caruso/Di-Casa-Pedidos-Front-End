import { CarrinhoProvider } from "../context/CarrinhoContexto";
import { PedidoProvider } from "../context/PedidoContexto";
import { RestauranteProvider } from "../context/RestauranteContexto";
import { UsuarioProvider } from "../context/UsuarioContexto";
import { ToastProvider } from "../context/ToastContexto";

export const AppProvider = ({ children }) => {
  return (
    <ToastProvider>
      <RestauranteProvider>
        <UsuarioProvider>
          <PedidoProvider>
            <CarrinhoProvider>
              {children}
            </CarrinhoProvider>
          </PedidoProvider>
        </UsuarioProvider>
      </RestauranteProvider>
    </ToastProvider>
  );
};
