// Importando o componente 'Image' do Next.js para otimizar o carregamento das imagens
import Image from "next/image";

// Importando o componente 'Category' que provavelmente exibe categorias de produtos ou conteúdo
import { Category } from "./page/index";

// Componente principal da página 'Home'
export default function Home() {
  return (
    // Container principal da página, com layout flexível para se ajustar à tela
    <div className="flex h-screen flex-col bg-white">
      {/* Seção de imagem centralizada */}
      <div className="flex items-center justify-center">
        {/* Imagem do Chuck Norris com um efeito de "shake" quando o usuário passa o mouse */}
        <Image
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" // URL da imagem
          alt="Chuck Norris" // Texto alternativo para a imagem
          width={360} // Largura da imagem
          height={219} // Altura da imagem
          className="shake-on-hover mt-3 cursor-pointer" // Classe CSS para adicionar o efeito de 'shake' e outras estilizações
        />
      </div>

      {/* Seção que contém o componente 'Category', centralizada na página */}
      <div className="flex h-96 items-center justify-center">
        {/* Exibindo o componente Category, provavelmente com lista de categorias ou produtos */}
        <Category />
      </div>
    </div>
  );
}
