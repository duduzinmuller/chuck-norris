import React from "react";
import { Joke } from "../types/type";

/**
 * Props para o componente JokeCard.
 * @typedef {Object} JokeCardProps
 * @property {Joke | null} joke - Objeto contendo os dados da piada. Se for null, nada é renderizado.
 */

/**
 * Componente que exibe uma piada em um card estilizado.
 *
 * Se a propriedade `joke` for null, o componente não renderiza nada.
 *
 * @param {JokeCardProps} props - Propriedades do componente.
 * @returns {JSX.Element | null} Retorna um elemento JSX exibindo a piada ou null se não houver piada.
 */
const JokeCard: React.FC<{ joke: Joke | null }> = ({ joke }) => {
  if (!joke) {
    return null;
  }

  return (
    <div className="p-4 mt-4 border rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <p className="text-xl font-semibold">{joke.value}</p>
    </div>
  );
};

export default JokeCard;
