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

  test("selects a category and fetches a joke", async () => {
    (fetchCategories as jest.Mock).mockResolvedValue(["animal", "career"]);
    (fetchJokeByCategory as jest.Mock).mockResolvedValue({
      id: "123",
      value: "Chuck Norris joke",
    });

    render(<Category />);

    await waitFor(() => expect(fetchCategories).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText("Select one category:"), {
      target: { value: "animal" },
    });

    fireEvent.click(screen.getByText("Generate joke by category"));

    await waitFor(() =>
      expect(fetchJokeByCategory).toHaveBeenCalledWith("animal"),
    );
    await waitFor(() =>
      expect(screen.getByText("Chuck Norris joke")).toBeInTheDocument(),
    );
  });
});
