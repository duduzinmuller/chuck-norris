import axios from "axios";
import { Joke } from "../types/type";

interface JokeResponse {
  icon_url: string;
  id: string;
  value: string;
}

export const fetchRandomJoke = async (): Promise<JokeResponse> => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar piada:", error);
    throw new Error("Não foi possível buscar a piada.");
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://api.chucknorris.io/jokes/categories",
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Não foi possível carregar as categorias.");
  }
};

export const fetchJokeByCategory = async (category: string): Promise<Joke> => {
  try {
    const response = await axios.get(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );

    // Retornando um objeto Joke completo
    return {
      icon_url: response.data.icon_url,
      id: response.data.id,
      value: response.data.value,
    };
  } catch (error) {
    console.error("Erro ao buscar piada por categoria:", error);
    throw new Error("Não foi possível buscar a piada dessa categoria.");
  }
};