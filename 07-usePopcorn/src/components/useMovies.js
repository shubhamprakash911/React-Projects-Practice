import { useEffect, useState } from "react";
const key = "162d1f9c";

export function useMovies(query) {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setisLoading(true);
        seterror("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrogn with fetching movies");
        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
        seterror("");
      } catch (error) {
        if (error.name !== "AbortError") {
          seterror(error.message);
        }

        console.log(error);
      } finally {
        setisLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      seterror("");
      return;
    }

    // handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { isLoading, movies, error };
}
