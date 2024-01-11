import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/Movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  URI= 'http://localhost:3000/api/movies';
  constructor(private http: HttpClient) { }

  getMovieList():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.URI);
  }

  getGenres():Observable<string[]>{
    return this.http.get<string[]>(this.URI + '/genres');
  }

  updateMovie(id: string, movie: Movie):Observable<ApiResponseUp>{
    return this.http.patch<ApiResponseUp>(this.URI + '/' + id,movie);
  }

  deleteMovie(id: string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.URI + '/' + id);
  }

  addMovie(movie: Movie):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.URI,movie);
  }

  getMovie(id: string):Observable<Movie>{
    return this.http.get<Movie>(this.URI + '/movie/' +id)
  }
}

interface ApiResponse
{
  status: string;
}

interface ApiResponseUp
{
  status: string,
  movie: Movie;
}
