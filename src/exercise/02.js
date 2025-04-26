import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [state, setState] = useState({
    data: null,
    errors: null,
    status: "pending",
  });

  useEffect(() => {
    async function fetchPokemon() {
      setState({ data: null, errors: null, status: "pending" });
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const result = await response.json();
        setState({
          data: { id: result.id, name: result.name },
          errors: null,
          status: "fulfilled",
        });
      } catch (error) {
        setState({ data: null, errors: [error.message], status: "rejected" });
      }
    }

    fetchPokemon();
  }, [name]);

  return state;
}