import { useState } from 'react';

const IMAGEM_ERRO =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=';

export function FotoProduto(props) {
  const [erro, setErro] = useState(false);

  const aoDarErro = () => {
    setErro(true);
  };

  const { src, alt, style, className, ...resto } = props;

  if (erro) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className || ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={IMAGEM_ERRO}
            alt="Erro ao carregar imagem"
            {...resto}
            data-url-original={src}
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...resto}
      onError={aoDarErro}
    />
  );
}