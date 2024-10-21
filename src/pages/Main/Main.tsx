import { useEffect, useState } from "react";

import { AppState } from "../../models/app-state.model";
import JokeList from "../../components/JokeList";

export default function MainPage() {
  const NUMBER_OF_JOKES = 3;
  const [state, setState] = useState<AppState>({
    values: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchJokes = async () => {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

      try {
        const jokePromises = Array.from(Array(NUMBER_OF_JOKES).keys()).map(() =>
          fetch("https://api.chucknorris.io/jokes/random", {
            signal: abortController.signal,
          }).then((res) => res.json())
        );
        const responses = await Promise.all(jokePromises);

        const fetchedJokes = responses.map((response) => ({
          id: String(response.id),
          value: String(response.value),
        }));

        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          values: fetchedJokes,
          error: null,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: "An error ocurred",
        }));
      }
    };

    fetchJokes();

    /* 
    Abort the request as it isn't needed anymore, the component being 
    unmounted. It helps avoid, among other things, the well-known "can't
    perform a React state update on an unmounted component" warning.
  */
    return () => abortController.abort("Aborted fetchJokes");
  }, []);

  return (
    <div>
      <h1>List Of Jokes</h1>
      {state.isLoading && <p> Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {state.values.length === NUMBER_OF_JOKES ? (
        <JokeList jokeList={state.values}></JokeList>
      ) : (
        <></>
      )}
    </div>
  );
}
