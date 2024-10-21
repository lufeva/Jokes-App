import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { Joke } from "../models/joke.model";
import { Flex1, JokeItem, JokeRow } from "./JokeList.styles";

interface JokeListProps {
  jokeList: Joke[];
}

interface JokeCounter {
  [id: Joke["id"]]: number;
}

export default function JokeList({ jokeList }: JokeListProps) {
  const dict = jokeList.reduce((acc, joke) => ({ ...acc, [joke.id]: 0 }), {});
  const [jokesCount, setJokesCount] = useState<JokeCounter>(dict);

  const onLikeJoke = (jokeId: string) => {
    setJokesCount({
      ...jokesCount,
      [jokeId]: jokesCount[jokeId] + 1,
    });
  };

  return (
    <>
      <JokeRow>
        <h2>Joke</h2>
        <h2>Likes</h2>
      </JokeRow>
      {jokeList.map((joke) => (
        <JokeRow key={joke.id}>
          <JokeItem>
            <Flex1>{joke.value}</Flex1>
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={() => onLikeJoke(joke.id)}
            />
          </JokeItem>
          <div>{jokesCount[joke.id]}</div>
        </JokeRow>
      ))}
    </>
  );
}
