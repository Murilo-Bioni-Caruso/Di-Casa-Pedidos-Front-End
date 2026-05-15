import { createContext, useContext, useState } from 'react';
import { UsuarioService } from '../service/UsuarioService';
import { usuariosApi } from '../api/api';
import { useRestaurante } from './RestauranteContexto';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const salvo = sessionStorage.getItem('usuario-dicasa');
    return salvo ? JSON.parse(salvo) : null;
  });

  const { calcularDistancia, calcularTaxaEntrega } = useRestaurante();

  const salvarUsuario = async (dadosUsuario) => {
    const { distancia, taxaEntrega } = UsuarioService.calcularEntrega(
      dadosUsuario.endereco,
      calcularDistancia,
      calcularTaxaEntrega
    );

    // Se já tem usuário logado, só atualiza — não cria um novo
    if (usuario?.id) {
      const atualizado = {
        ...usuario,
        ...dadosUsuario,
        distancia,
        taxaEntrega,
        isAdmin: usuario.isAdmin,
      };
      await usuariosApi.atualizar(atualizado);
      sessionStorage.setItem('usuario-dicasa', JSON.stringify(atualizado));
      setUsuario(atualizado);
      return;
    }

    // Usuário novo — cria normalmente
    const usuarioCriado = UsuarioService.criarUsuario(
      dadosUsuario,
      calcularDistancia,
      calcularTaxaEntrega
    );
    const salvo = await usuariosApi.criar(usuarioCriado);
    sessionStorage.setItem('usuario-dicasa', JSON.stringify(salvo));
    setUsuario(salvo);
  };

  const limparUsuario = () => {
    sessionStorage.removeItem('usuario-dicasa');
    setUsuario(null);
  };

  const calcularEntregaPreview = (endereco) => {
    return UsuarioService.calcularEntrega(
      endereco,
      calcularDistancia,
      calcularTaxaEntrega
    );
  };

  const autenticar = async (usuario, senha) => {
    try {
      const user = await usuariosApi.login({ usuario, senha });
      sessionStorage.setItem('usuario-dicasa', JSON.stringify(user));
      setUsuario(user);
      return user;
    } catch {
      return null;
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        salvarUsuario,
        limparUsuario,
        calcularEntregaPreview,
        autenticar
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario deve ser usado dentro de UsuarioProvider');
  }
  return context;
};