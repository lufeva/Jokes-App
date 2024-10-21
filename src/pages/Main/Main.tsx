import { useEffect, useState } from "react";
import { AppState } from "../../models/app-state.model";
import JokeList from "../../components/JokeList";

export default function MainPage() {
  const NUMBER_OF_JOKES = 3;
  const [state, setState] = useState<AppState>({
    values: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchJokes = async () => {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const jokePromises = Array.from(Array(NUMBER_OF_JOKES).keys()).map(() =>
          fetch("https://api.chucknorris.io/jokes/random")
        );
        const responses = await Promise.all(jokePromises);
        const responsesData = await Promise.all(
          responses.map((res) => res.json())
        );
        const fetchedJokes = responsesData.map((response) => ({
          id: String(response.id),
          value: String(response.value),
        }));

        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          values: fetchedJokes,
        }));
      } catch (error) {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: "An error ocurred",
        }));
      }
    };

    fetchJokes();
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
