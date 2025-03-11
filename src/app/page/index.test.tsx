import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Category } from "./index";
import {
  fetchCategories,
  fetchJokeByCategory,
  fetchRandomJoke,
} from "../services/jokeService";

// Mocking the API service
jest.mock("../services/jokeService", () => ({
  fetchCategories: jest.fn(),
  fetchJokeByCategory: jest.fn(),
  fetchRandomJoke: jest.fn(),
}));

describe("Category Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial elements", async () => {
    (fetchCategories as jest.Mock).mockResolvedValue(["animal", "career"]);

    render(<Category />);

    expect(screen.getByText("Chuck Norris's Jokes")).toBeInTheDocument();
    expect(screen.getByText("Select one category:")).toBeInTheDocument();

    await waitFor(() => expect(fetchCategories).toHaveBeenCalledTimes(1));
  });
});
