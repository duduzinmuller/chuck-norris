import React from "react";
import { render, screen } from "@testing-library/react";
import JokeCard from "./JokeCard"; // Caminho do componente
import { Joke } from "../types/type"; // Supondo que "Joke" seja o tipo do objeto da piada

describe("JokeCard Component", () => {
  it("should render the joke when a valid joke is provided", () => {
    // Definindo uma piada mockada
    const mockJoke: Joke = {
      id: "1",
      value: "Chuck Norris can divide by zero.",
      icon_url: "https://example.com/icon.png",
    };

    // Renderizando o componente com a piada mockada
    render(<JokeCard joke={mockJoke} />);

    // Verificando se a piada está sendo exibida
    expect(
      screen.getByText(/Chuck Norris can divide by zero./),
    ).toBeInTheDocument();
  });
});
