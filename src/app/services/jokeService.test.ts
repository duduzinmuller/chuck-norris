import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeByCategory,
} from "./jokeService";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("jokeService functions", () => {
  // Test for fetchRandomJoke
  describe("fetchRandomJoke", () => {
    it("should return a random joke successfully", async () => {
      // Mock API response
      const mockResponse = {
        data: {
          icon_url: "https://example.com/icon.png",
          id: "123",
          value: "Chuck Norris can divide by zero.",
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse); // Mocking axios

      const joke = await fetchRandomJoke();
      expect(joke).toEqual(mockResponse.data); // Check if the returned response matches the mock
    });

    it("should throw an error if the API fails", async () => {
      // Mock API error
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        await fetchRandomJoke();
      } catch (error) {
        expect(error).toEqual(new Error("Could not fetch the joke.")); // Check if the error is as expected
      }
    });
  });

  // Test for fetchCategories
  describe("fetchCategories", () => {
    it("should return categories successfully", async () => {
      // Mock API response
      const mockResponse = {
        data: ["animal", "celebrity", "dev"],
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse); // Mocking axios

      const categories = await fetchCategories();
      expect(categories).toEqual(mockResponse.data); // Check if the returned categories match the mock
    });

    it("should throw an error if fetchCategories the API fails", async () => {
      // Mock API error
      (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

      try {
        await fetchCategories();
      } catch (error) {
        expect(error).toEqual(new Error("Could not load categories.")); // Check if the error is as expected
      }
    });
  });

  describe("fetchJokeByCategory", () => {
    it("should return a joke for the given category", async () => {
      const category = "dev";
      const mockResponse = {
        data: {
          icon_url: "https://example.com/icon.png",
          id: "456",
          value: "Chuck Norris can debug 0 errors in 0 seconds.",
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse); // Mocking axios

      const joke = await fetchJokeByCategory(category);
      expect(joke).toEqual(mockResponse.data); // Check if the returned joke matches the mock
    });
  });
});
