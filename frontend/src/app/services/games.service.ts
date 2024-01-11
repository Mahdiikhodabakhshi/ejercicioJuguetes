import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResult, Game} from "../common/Game";


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  URL = "http://localhost:3000/api/games/"


  constructor(private http :HttpClient) { }

  getGames(page:number) : Observable<ApiResult>{
    return this.http.get<ApiResult>(this.URL+'paged/'+page +'/6')
  }

  getOneGame(id : string) : Observable<Game>{
    return this.http.get<Game>(this.URL + "game/" + id)
  }

  getCategoria() : Observable<string[]>{
    return this.http.get<string[]>(this.URL + "categorias")
  }

  addGame(game : Game):Observable<ApiResponse>{
    console.log(game)
    return this.http.post<ApiResponse>(this.URL , game)
  }

  deleteGame(id:string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.URL+ id)
  }


  updateGame(game : Game):Observable<ApiResponseUp>{
    return this.http.patch<ApiResponseUp>(this.URL+'/'+game._id , game)
  }





}
interface ApiResponse
{
  status: string;
}

interface ApiResponseUp
{
  status: string,
  game: Game;
}
