import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRandomJoke } from "../services/jokeService";

/**
 * API Handler que retorna uma piada aleatória do Chuck Norris.
 *
 * @param {NextApiRequest} req - Objeto da requisição HTTP.
 * @param {NextApiResponse} res - Objeto da resposta HTTP.
 * @returns {Promise<void>} Responde com um JSON contendo a piada ou um erro.
 */
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const joke = await fetchRandomJoke();
      res.status(200).json({ joke });
    } catch (error) {
      console.error("Erro ao buscar piada:", error);
      res.status(500).json({ error: "Error fetching joke:" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
