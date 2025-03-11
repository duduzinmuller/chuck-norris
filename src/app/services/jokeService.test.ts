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
  });
});
