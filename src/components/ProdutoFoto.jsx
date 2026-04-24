import { useState } from "react";
import { IMAGEM_ERRO } from "../assets/ImagemErro";

export function FotoProduto({ src, alt, className, style, ...resto }) {
  const [erro, setErro] = useState(false);

  const srcValido = src && src.trim() !== '';

  // 👉 se não tiver src válida, já entra no fallback
  if (!srcValido || erro) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
      >
        <img
          src={IMAGEM_ERRO}
          alt="Imagem indisponível"
          className="w-16 h-16 opacity-50"
          {...resto}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className || ''}`}
      style={style}
      onError={() => setErro(true)}
      {...resto}
    />
  );
}