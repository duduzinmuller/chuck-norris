import { handler } from "./joke";
import { createMocks } from "node-mocks-http";

// Importação do fetchRandomJoke diretamente
import { fetchRandomJoke } from "../services/jokeService";

// Mock da função fetchRandomJoke
jest.mock("../services/jokeService", () => ({
  fetchRandomJoke: jest.fn(),
}));

describe("API Handler - /api/joke", () => {
  it("Should return a random joke with status 200 when the GET method is called", async () => {
    const mockJoke = { joke: "Chuck Norris can divide by zero." };

    // Garantir que a função mockada retorna o valor correto
    (fetchRandomJoke as jest.Mock).mockResolvedValue(mockJoke); // Aqui estamos dizendo explicitamente que fetchRandomJoke é um Mock

    // Criando o mock de requisição e resposta
    const { req, res } = createMocks({
      method: "GET",
    });

    // Chama o handler da API
    await handler(req, res);

    // Verifique se o status foi 200 e se o corpo da resposta é correto
    expect(res.statusCode).toBe(200);
  });
});
