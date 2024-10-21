import { useState } from "react";
import { Joke } from "../models/joke.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./JokeList.css";

interface JokeListProps {
  jokeList: Joke[];
}

interface JokeCounter extends Joke {
  countLikes: number;
}

export default function JokeList({ jokeList }: JokeListProps) {
  const initialJokes: JokeCounter[] = jokeList.map((joke) => ({
    ...joke,
    countLikes: 0,
  }));

  const [jokesCount, setJokesCount] = useState<JokeCounter[]>(initialJokes);

  const onLikeJoke = (jokeId: string) => {
    setJokesCount(
      jokesCount.map((joke) =>
        joke.id === jokeId ? { ...joke, countLikes: joke.countLikes + 1 } : joke
      )
    );
  };

  return (
    <>
      <div className="joke-row">
        <h2>Joke</h2>
        <h2>Likes</h2>
      </div>
      {jokesCount.map((joke) => (
        <div className="joke-row" key={joke.id}>
          <div>
            {joke.value}
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={() => onLikeJoke(joke.id)}
            />
          </div>
          <div>{joke.countLikes}</div>
        </div>
      ))}
    </>
  );
}
