'use client'

import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { fetchCategories, fetchJokeByCategory, fetchRandomJoke } from "../services/jokeService";
import { Joke } from "../types/type"; 
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * Componente que exibe a interface de busca e exibição de piadas do Chuck Norris.
 *
 * Permite ao usuário selecionar uma categoria e gerar uma piada específica ou gerar uma piada aleatória.
 *
 * @component
 * @returns {JSX.Element} A interface completa da página.
 */
export const Category = () => {
  // Estado para armazenar as categorias disponíveis
  const [categories, setCategories] = useState<string[]>([]);
  // Estado para armazenar a categoria selecionada pelo usuário
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Estado para armazenar a piada obtida da API
  const [joke, setJoke] = useState<Joke | null>(null);
  // Estado para controlar o carregamento quando a piada é gerada por categoria
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  // Estado para controlar o carregamento quando a piada é gerada de forma aleatória
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);

  /**
   * useEffect para carregar as categorias da API ao montar o componente.
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    loadCategories();
  }, []);

  /**
   * Busca uma piada de acordo com a categoria selecionada e atualiza o estado.
   *
   * @async
   * @function getJokeByCategory
   */
  const getJokeByCategory = async () => {
    if (!selectedCategory) return;

    setLoadingCategory(true);
    try {
      const fetchedJoke = await fetchJokeByCategory(selectedCategory);
      setJoke(fetchedJoke);
    } catch (error) {
      console.error("Erro ao buscar piada por categoria:", error);
      setJoke(null);
    }
    setLoadingCategory(false);
  };

  /**
   * Busca uma piada aleatória da API e atualiza o estado.
   *
   * @async
   * @function getRandomJoke
   */
  const getRandomJoke = async () => {
    setLoadingRandom(true);
    try {
      const fetchedJoke = await fetchRandomJoke();
      setJoke(fetchedJoke);
    } catch (error) {
      console.error("Erro ao buscar piada aleatória:", error);
      setJoke(null);
    }
    setLoadingRandom(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <header>
        <h1 className="text-3xl font-bold">Chuck Norris's Jokes</h1>
      </header>

      {/* Seção para seleção de categoria */}
      <section className="mt-4">
        <Label htmlFor="category" className="mr-2 text-lg">
          Select one category:
        </Label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-md border-2 ml-8"
        >
          <option value="">Select</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>

      {/* Seção de exibição da piada */}
      <section className="mt-4 flex gap-4">
        {joke && (
          <article aria-live="polite">
            <JokeCard joke={joke} />
          </article>
        )}
      </section>

      {/* Seção de botões para gerar piadas */}
      <section className="flex flex-row gap-5 mt-3">
        <Button
          onClick={getJokeByCategory}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={loadingCategory || !selectedCategory}
        >
          {loadingCategory ? "Loading..." : "Generate joke by category"}
        </Button>

        <Button
          onClick={getRandomJoke}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          disabled={loadingRandom}
        >
          {loadingRandom ? "Loading..." : "Generate random joke"}
        </Button>
      </section>
    </main>
  );
};
