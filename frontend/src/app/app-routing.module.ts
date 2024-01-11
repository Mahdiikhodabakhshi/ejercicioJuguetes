import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieListComponent} from "./componets/movie-list/movie-list.component";
import {GamesComponent} from "./componets/games/games.component";
import {HomeComponent} from "./componets/home/home.component";

const routes: Routes = [
  {path : '' ,pathMatch:'full' , redirectTo : 'home'},
  {path : 'home' , component:HomeComponent},
  {path : 'movies' ,component:MovieListComponent},
  {path:'games' , component:GamesComponent},

  {path : '**' ,pathMatch:'full' , redirectTo : 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
