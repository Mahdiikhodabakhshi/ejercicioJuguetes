

export interface Movie {
  _id: string;
  title: string;
  year: number;
  director: string;
  plot: string;
  genres: string[];
  poster: string;
  imdb: {
    id: string;
    rating: number;
    votes: number;
  }
}


