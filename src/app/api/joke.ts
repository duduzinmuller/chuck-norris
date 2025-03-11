import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRandomJoke } from "../services/jokeService";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const joke = await fetchRandomJoke();
      res.status(200).json({ joke });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar piada:" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
