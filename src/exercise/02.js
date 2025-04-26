import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          setData(null);
          return;
        }
        const result = await response.json();
        setData({ id: result.id, name: result.name });
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
        setData(null);
      }
    }

    fetchPokemon();
  }, [name]);

  return { data };
}