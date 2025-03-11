import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeByCategory,
} from "./jokeService";
import axios from "axios";

jest.mock("axios");

describe("jokeService functions", () => {
  describe("fetchRandomJoke", () => {
    it("should return categories successfully", async () => {
      const mockResponse = {
        data: ["animal", "celebrity", "dev"],
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse); // Mocking axios

      const categories = await fetchCategories();
      expect(categories).toEqual(mockResponse.data);
    });

    it("should throw an error if the API fails", async () => {
      // Mock API error
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        await fetchRandomJoke();
      } catch (error) {
        expect(error).toEqual(new Error("Could not fetch the joke.")); // Esperando a mensagem de erro em inglês
      }
    });
  });
});
