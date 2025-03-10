import React, { useState, useEffect } from "react";
import { fetchRandomJoke } from "../services/jokeService";

interface Joke {
  icon_url: string;
  id: string;
  joke: string;
}

const JokeCard: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getJoke = async () => {
      setLoading(true);
      try {
        const fetchedJoke = await fetchRandomJoke();
        setJoke({
          icon_url: fetchedJoke.icon_url,
          id: fetchedJoke.id,
          joke: fetchedJoke.joke,
        });
      } catch (error) {
        console.error("Erro ao buscar piada:", error);
      } finally {
        setLoading(false);
      }
    };

    getJoke();
  }, []);

  if (loading) return <p>Carregando piada...</p>;

  return (
    <div>
      {joke ? (
        <div>
          <p>{joke.joke}</p>
        </div>
      ) : (
        <p>Não foi possível carregar a piada.</p>
      )}
    </div>
  );
};

export default JokeCard;
