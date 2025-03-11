'use client'

import { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import { fetchCategories, fetchJokeByCategory, fetchRandomJoke } from "../services/jokeService";
import { Joke } from "../types/type"; 
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, []);

  const getJokeByCategory = async () => {
    if (!selectedCategory) return;

    setLoadingCategory(true); 
    try {
      const fetchedJoke = await fetchJokeByCategory(selectedCategory);
      setJoke(fetchedJoke);  
    } catch (error) {
      console.error(error);
      setJoke(null);
    }
    setLoadingCategory(false); 
  };

  const getRandomJoke = async () => {
    setLoadingRandom(true); 
    try {
      const fetchedJoke = await fetchRandomJoke();
      setJoke(fetchedJoke);
    } catch (error) {
      console.error(error);
      setJoke(null);
    }
    setLoadingRandom(false); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Chuck Norris's Jokes</h1>

      <div className="mt-4">
        <Label htmlFor="category" className="mr-2 text-lg">
          Select one category:
        </Label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-md border-2 ml-8"
        >
          <option value="">Select</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-4">
        <JokeCard joke={joke} />
      </div>

      <div className="flex flex-row gap-5 mt-3">
        <Button
          onClick={getJokeByCategory}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={loadingCategory || !selectedCategory} 
        >
          {loadingCategory ? "Loading..." : "Generate joke by category"}
        </Button>

        <Button
          onClick={getRandomJoke}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          disabled={loadingRandom} 
        >
          {loadingRandom ? "Loading..." : "Generate joke random"}
        </Button>
      </div>
    </div>
  );
};
