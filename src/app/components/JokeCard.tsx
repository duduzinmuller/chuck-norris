import React, { useState, useEffect } from "react";
import { Joke } from "../types/type";

/**
 * Componente que exibe uma piada com efeito de digitação.
 *
 * - Sempre exibe "Generating joke..." antes de escrever a nova piada.
 * - A piada é digitada letra por letra.
 * - A última piada permanece visível até uma nova ser gerada.
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {Joke | null} props.joke - Objeto contendo os dados da piada ou null se nenhuma piada foi carregada.
 * @returns {JSX.Element} Um card exibindo a piada digitada.
 */
const JokeCard: React.FC<{ joke: Joke | null }> = ({ joke }) => {
  /** Estado do texto exibido no card (exibe "Generating joke..." antes da piada). */
  const [text, setText] = useState("Generating joke...");

  /** Velocidade da digitação em milissegundos. */
  const [delta, setDelta] = useState(50);

  /** Índice da próxima letra a ser adicionada ao texto exibido. */
  const [index, setIndex] = useState(0);

  /** Define se deve exibir "Generating joke..." antes de iniciar a digitação. */
  const [showGenerating, setShowGenerating] = useState(true);

  /**
   * Sempre que uma nova piada é recebida:
   * - Exibe "Generating joke..." por 1 segundo.
   * - Reseta o texto para iniciar a animação de digitação.
   */
  useEffect(() => {
    if (!joke) return; // Se não há piada, não faz nada.

    setText("Generating joke..."); // Exibe a mensagem inicial.
    setShowGenerating(true);
    setIndex(0); // Reseta o índice para recomeçar a digitação.

    // Após 1 segundo, inicia a animação de digitação.
    const timer = setTimeout(() => {
      setText(""); // Limpa o texto para iniciar a nova piada.
      setShowGenerating(false);
    }, 1000);

    return () => clearTimeout(timer); // Limpa o timeout ao desmontar ou atualizar a piada.
  }, [joke]);

  /**
   * Controla o efeito de digitação letra por letra.
   * - Apenas começa quando a piada está disponível e "Generating joke..." desapareceu.
   * - Adiciona uma nova letra a cada intervalo de tempo definido por `delta`.
   */
  useEffect(() => {
    if (!joke || showGenerating || index >= joke.value.length) return;

    const ticker = setTimeout(() => {
      setText((prev) => prev + joke.value[index]); // Adiciona a próxima letra.
      setIndex((prev) => prev + 1); // Atualiza o índice.
    }, delta);

    return () => clearTimeout(ticker); // Evita múltiplas execuções ao atualizar o estado.
  }, [joke, index, showGenerating, delta]);

  return (
    <div className="mx-auto mt-4 max-w-md rounded-lg border bg-white p-4 shadow-lg">
      <p className="text-xl font-semibold">{text}</p>
    </div>
  );
};

export default JokeCard;
