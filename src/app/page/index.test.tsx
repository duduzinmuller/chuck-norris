import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Category } from "./index";
import {
  fetchCategories,
  fetchJokeByCategory,
  fetchRandomJoke,
} from "../services/jokeService";

// Mockando o serviço de API para evitar chamadas reais durante os testes
jest.mock("../services/jokeService", () => ({
  fetchCategories: jest.fn(), // Simula a função de buscar categorias
  fetchJokeByCategory: jest.fn(), // Simula a função de buscar piadas por categoria
  fetchRandomJoke: jest.fn(), // Simula a função de buscar uma piada aleatória
}));

describe("Category Component", () => {
  // Antes de cada teste, limpa os mocks para garantir que os testes sejam independentes
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Teste 1: Verifica se o componente renderiza corretamente com os elementos iniciais.
   */
  test("renders correctly with initial elements", async () => {
    // Simula a resposta da API com categorias fictícias
    (fetchCategories as jest.Mock).mockResolvedValue(["animal", "career"]);

    // Renderiza o componente
    render(<Category />);

    // Verifica se o título principal está na tela
    expect(screen.getByText("Chuck Norris's Jokes")).toBeInTheDocument();

    // Verifica se o texto do rótulo do seletor de categorias está na tela
    expect(screen.getByText("Select one category:")).toBeInTheDocument();

    // Aguarda a chamada da API de categorias e verifica se foi chamada uma única vez
    await waitFor(() => expect(fetchCategories).toHaveBeenCalledTimes(1));
  });

  /**
   * Teste 2: Simula a seleção de uma categoria e verifica se uma piada correspondente é buscada e exibida.
   */
  test("selects a category and fetches a joke", async () => {
    // Simula as categorias disponíveis na API
    (fetchCategories as jest.Mock).mockResolvedValue(["animal", "career"]);

    // Simula a resposta da API ao buscar uma piada para a categoria "animal"
    (fetchJokeByCategory as jest.Mock).mockResolvedValue({
      id: "123",
      value: "Chuck Norris joke",
    });

    // Renderiza o componente
    render(<Category />);

    // Aguarda a API de categorias ser chamada
    await waitFor(() => expect(fetchCategories).toHaveBeenCalledTimes(1));

    // Simula a seleção da categoria "animal" no dropdown
    fireEvent.change(screen.getByLabelText("Select one category:"), {
      target: { value: "animal" },
    });

    // Simula o clique no botão de gerar piada pela categoria
    fireEvent.click(screen.getByText("Generate joke by category"));

    // Aguarda e verifica se a API foi chamada corretamente com a categoria "animal"
    await waitFor(() =>
      expect(fetchJokeByCategory).toHaveBeenCalledWith("animal"),
    );

    // Aguarda e verifica se a piada gerada aparece na tela
    await waitFor(() =>
      expect(screen.getByText("Chuck Norris joke")).toBeInTheDocument(),
    );
  });

  /**
   * Teste 3: Simula a geração de uma piada aleatória e verifica se ela é exibida.
   */
  test("fetches a random joke", async () => {
    // Simula a resposta da API ao buscar uma piada aleatória
    (fetchRandomJoke as jest.Mock).mockResolvedValue({
      id: "456",
      value: "Random Chuck Norris joke",
    });

    // Renderiza o componente
    render(<Category />);

    // Simula o clique no botão de gerar piada aleatória
    fireEvent.click(screen.getByText("Generate random joke"));

    // Aguarda e verifica se a API de piada aleatória foi chamada
    await waitFor(() => expect(fetchRandomJoke).toHaveBeenCalledTimes(1));

    // Aguarda e verifica se a piada aleatória aparece na tela
    await waitFor(() =>
      expect(screen.getByText("Random Chuck Norris joke")).toBeInTheDocument(),
    );
  });
});
