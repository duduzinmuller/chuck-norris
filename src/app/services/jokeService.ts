import axios from "axios";
import { Joke } from "../types/type";

/**
 * Representa a resposta da API para uma piada aleatória.
 */
interface JokeResponse {
  icon_url: string;
  id: string;
  value: string;
}

/**
 * Busca uma piada aleatória da API do Chuck Norris.
 *
 * @returns {Promise<JokeResponse>} Uma promessa que resolve com os dados da piada.
 * @throws {Error} Lança um erro se não for possível buscar a piada.
 */
export const fetchRandomJoke = async (): Promise<JokeResponse> => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar piada:", error);
    throw new Error("Could not fetch the joke.");
  }
};

/**
 * Busca as categorias disponíveis de piadas da API do Chuck Norris.
 *
 * @returns {Promise<string[]>} Uma promessa que resolve com um array de strings representando as categorias.
 * @throws {Error} Lança um erro se não for possível carregar as categorias.
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://api.chucknorris.io/jokes/categories",
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Could not load categories.");
  }
};

/**
 * Busca uma piada da API do Chuck Norris com base em uma categoria específica.
 *
 * @param {string} category - A categoria para a qual deseja buscar uma piada.
 * @returns {Promise<Joke>} Uma promessa que resolve com um objeto do tipo Joke contendo os dados da piada.
 * @throws {Error} Lança um erro se não for possível buscar a piada para a categoria informada.
 */
export const fetchJokeByCategory = async (category: string): Promise<Joke> => {
  try {
    const response = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${category}`,
    );

    return {
      icon_url: response.data.icon_url,
      id: response.data.id,
      value: response.data.value,
    };
  } catch (error) {
    console.error("Erro ao buscar piada por categoria:", error);
    throw new Error("Could not fetch the joke for this category.");
  }
};
