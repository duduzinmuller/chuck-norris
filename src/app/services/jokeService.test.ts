import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeByCategory,
} from "./jokeService";
import axios from "axios";

// Mock do axios para simular as requisições HTTP sem fazer chamadas reais à API
jest.mock("axios");

describe("jokeService functions", () => {
  // Testes para a função fetchRandomJoke
  describe("fetchRandomJoke", () => {
    it("should return a random joke successfully", async () => {
      // Resposta mockada para simular o retorno da API
      const mockResponse = {
        data: {
          icon_url: "https://example.com/icon.png",
          id: "123",
          value: "Chuck Norris can divide by zero.",
        },
      };

      // Simulando a resposta do axios com o valor mockado
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      // Chamando a função que queremos testar
      const joke = await fetchRandomJoke();

      // Verificando se a resposta recebida é igual ao valor mockado
      expect(joke).toEqual(mockResponse.data);
    });

    it("should throw an error if the API fails", async () => {
      // Simulando um erro de rede
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        // Tentando chamar a função que deve falhar
        await fetchRandomJoke();
      } catch (error) {
        // Verificando se o erro gerado tem a mensagem correta
        expect(error).toEqual(new Error("Could not fetch the joke."));
      }
    });
  });

  // Testes para a função fetchCategories
  describe("fetchCategories", () => {
    it("should return categories successfully", async () => {
      // Resposta mockada para simular o retorno da API
      const mockResponse = {
        data: ["animal", "celebrity", "dev"],
      };

      // Simulando a resposta do axios com o valor mockado
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      // Chamando a função que queremos testar
      const categories = await fetchCategories();

      // Verificando se a lista de categorias retornada é igual ao valor mockado
      expect(categories).toEqual(mockResponse.data);
    });

    it("should throw an error if the API fails", async () => {
      // Simulando um erro de rede
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        // Tentando chamar a função que deve falhar
        await fetchCategories();
      } catch (error) {
        // Verificando se o erro gerado tem a mensagem correta
        expect(error).toEqual(new Error("Could not load categories."));
      }
    });
  });

  // Testes para a função fetchJokeByCategory
  describe("fetchJokeByCategory", () => {
    it("should return a joke for the given category", async () => {
      const category = "dev"; // Categoria para a qual estamos solicitando a piada

      // Resposta mockada para simular o retorno da API
      const mockResponse = {
        data: {
          icon_url: "https://example.com/icon.png",
          id: "456",
          value: "Chuck Norris can debug 0 errors in 0 seconds.",
        },
      };

      // Simulando a resposta do axios com o valor mockado
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      // Chamando a função que queremos testar passando a categoria
      const joke = await fetchJokeByCategory(category);

      // Verificando se a piada retornada corresponde à resposta mockada
      expect(joke).toEqual(mockResponse.data);
    });

    it("should throw an error if fetchJokeByCategory the API fails", async () => {
      const category = "dev"; // Categoria para a qual estamos solicitando a piada

      // Simulando um erro de rede
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        // Tentando chamar a função que deve falhar
        await fetchJokeByCategory(category);
      } catch (error) {
        // Verificando se o erro gerado tem a mensagem correta
        expect(error).toEqual(
          new Error("Could not fetch the joke for this category."),
        );
      }
    });
  });
});
