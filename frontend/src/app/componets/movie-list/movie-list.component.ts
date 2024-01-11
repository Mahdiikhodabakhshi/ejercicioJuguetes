import {Component, OnInit} from '@angular/core';
import {Movie} from "../../common/Movie";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit
{
  movies: Movie[] = [];
  formMovie: FormGroup = this.formbuilder.group(
    {
      _id: [''],
      __v: [0],
      title: [''],
      year: [new Date().getFullYear()],
      director: [''],
      plot: [''],
      poster: [''],
      genres: [],
      imdb: this.formbuilder.group(
        {
          rating: [0],
          votes: [0],
        }
      )
    }
  );
  mynewGenre = new FormGroup(
    {
      newGenre : new FormControl('')
    }
  );
  genres: string[] = [];
  editar = false;

  constructor(private movieService: MovieService,
              private formbuilder: FormBuilder) {}

  // Getters del formulario.
  get title():any
  {
    return this.formMovie.get('title')?.value;
  }
  get year():any
  {
    return this.formMovie.get('year');
  }
  get director():any
  {
    return this.formMovie.get('director');
  }
  get plot():any
  {
    return this.formMovie.get('plot');
  }
  get genresF():any
  {
    return this.formMovie.get('genresF')?.value;
  }
  get poster():any
  {
    return this.formMovie.get('poster')?.value;
  }
  get rating():any
  {
    return this.formMovie.get('rating');
  }
  get votes():any
  {
    return this.formMovie.get('votes');
  }
  get newGenre():any
  {
    return this.mynewGenre.get('newGenre')?.value;
  }
  ngOnInit(): void
  {
    this.loadMoviesList();
  }

  private loadMoviesList()
  {
    this.movieService.getMovieList().subscribe(
      {
        next: value => {
          this.movies = value;

        },
        error: err => {
          console.error(err);
        },
        complete:()=>{
          console.log('Complete');
        }
      }
    );
    this.movieService.getGenres().subscribe(
      {
        next: value => {
          this.genres = value;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Complete');
        }
      }
    )
  }

  onSubmit()
  {
    if(this.editar)
    {
      const id = this.formMovie.getRawValue()._id;
      this.movieService.updateMovie(id,this.formMovie.getRawValue()).subscribe(
        {
          next: value =>{
            this.loadMoviesList();
            alert(value.status);
          },
          error: (err) => {
            alert(err.error.text);
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      );
    }
    else {
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value =>{
            this.loadMoviesList();
            alert(value.status);

          },
          error: (err) => {
            alert(err.error.text);
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      );
    }
  }


  loadMovie(movie: Movie)
  {
    this.formMovie.setValue(movie);
    this.editar = true;
  }

  newMovie()
  {
    this.formMovie.reset();
    this.formMovie.get('year')?.setValue(new Date().getFullYear());
    this.editar = false;
  }

  addNewGenre(newGenre: string) {
    let newGenres;
    if (!this.editar) this.genres.push(newGenre)
    else {
      newGenres = this.formMovie.getRawValue().genres;
      newGenres.push(newGenre);
      this.genres.push(newGenre);
      this.formMovie.setControl('genres', new FormControl(newGenres)
      );
      this.mynewGenre.reset();
    }
  }

  removeMovie(movie: Movie){
    if(confirm('Desea borrar' + movie.title + '?'))
    {
      this.movieService.deleteMovie(movie._id).subscribe(
        {
          next: value => {
            alert(value.status)
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
      )
    }
  }

  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faTrash = faTrash;
  protected readonly faTrashCan = faTrashCan;

}
