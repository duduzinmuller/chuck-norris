import axios from "axios";

interface JokeResponse {
  icon_url: string;
  id: string;
  joke: string;
}

export const fetchRandomJoke = async ({}): Promise<JokeResponse> => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar piada:", error);
    throw new Error("Não foi possível buscar a piada.");
  }
};
