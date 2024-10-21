import { Joke } from "./joke.model";

export interface AppState {
  values: Joke[];
  isLoading: boolean;
  error: string | null;
}
