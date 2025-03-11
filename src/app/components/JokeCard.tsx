import React from "react";
import { Joke } from "../types/type";

interface JokeCardProps {
  joke: Joke | null;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke }) => {
  if (!joke) {
    return null; 
  }

  return (
    <div className="p-4 mt-4 border rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <p className="text-xl font-semibold">{joke.value}</p>
    </div>
  );
};

export default JokeCard;
