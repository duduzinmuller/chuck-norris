import { handler } from "./joke";
import { createMocks } from "node-mocks-http";
import { fetchRandomJoke } from "../services/jokeService";

/**
 * Mocka o módulo jokeService para substituir a função fetchRandomJoke.
 * Isso evita chamadas reais para APIs externas durante os testes.
 */
jest.mock("../services/jokeService", () => ({
  fetchRandomJoke: jest.fn(),
}));

/**
 * Testes para o handler da API `/api/joke`.
 */
describe("API Handler - /api/joke", () => {
  /**
   * Testa se a API retorna uma piada aleatória com status 200 quando a requisição é GET.
   */
  it("Should return a random joke with status 200 when the GET method is called", async () => {
    const mockJoke = { joke: "Chuck Norris can divide by zero." };

    // Simula um retorno bem-sucedido da função fetchRandomJoke
    (fetchRandomJoke as jest.Mock).mockResolvedValue(mockJoke);

    // Cria mocks para requisição e resposta HTTP
    const { req, res } = createMocks({
      method: "GET",
    });

    // Chama o handler da API
    await handler(req, res);

    // Verifica se o status HTTP é 200
    expect(res.statusCode).toBe(200);
  });

  /**
   * Testa se a API retorna um erro 500 caso ocorra uma falha ao buscar a piada.
   */
  it("Should return error 500 when there's a failure fetching the joke", async () => {
    // Simula um erro ao chamar fetchRandomJoke
    (fetchRandomJoke as jest.Mock).mockRejectedValue(
      new Error("Error fetching joke"),
    );

    // Cria mocks para requisição e resposta HTTP
    const { req, res } = createMocks({
      method: "GET",
    });

    // Chama o handler da API
    await handler(req, res);

    // Verifica se o status HTTP é 500 (erro interno do servidor)
    expect(res.statusCode).toBe(500);
  });

  /**
   * Testa se a API retorna erro 405 (Método não permitido) quando a requisição não for GET.
   */
  it("Should return error 405 for method not allowed", async () => {
    // Cria mocks para requisição e resposta HTTP, simulando um método POST
    const { req, res } = createMocks({
      method: "POST",
    });

    // Chama o handler da API
    await handler(req, res);

    // Verifica se o status HTTP é 405 (método não permitido)
    expect(res.statusCode).toBe(405);
  });
});
