import {Component, OnInit} from '@angular/core';
import {Game} from "../../common/Game";
import {GamesService} from "../../services/games.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import {Movie} from "../../common/Movie";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  miData ='';
  editar = false;

  formGame: FormGroup = this.formbuilder.group({
    _id: [''],
    __v: [0],
    nombre: [''],
    edadMinima: [0],
    precio: [0],
    categoria: ['']

  })
  mynewCategoria = new FormGroup(
    {
      newCategoria: new FormControl('')
    }
  );
  categorias: string[] = [];
  private currentPage: number = 1;

  constructor(private gameService: GamesService, private formbuilder: FormBuilder) {
  }


  get nombre(): any {
    return this.formGame.get('nombre');
  }

  get edad(): any {
    return this.formGame.get('edadMinima');
  }

  get precio(): any {
    return this.formGame.get('precio');
  }

  get categoria(): any {

    return this.formGame.get('categoria');
  }


  get newCategoria(): any {
    console.log(this.mynewCategoria.get('newCategoria'));
    return this.mynewCategoria.get('newCategoria');

  }


  protected readonly faCirclePlus = faCirclePlus;

  ngOnInit(): void {
    this.loadGamesList();

    //this.loadGame();
  }



  private loadGamesList() {

    this.gameService.getGames(this.currentPage).subscribe({
      next: value => {
        this.games = value.results.filter(
          item => item.nombre.includes(this.miData)
        )
      },
      error: err => console.error(err),
      complete: () => console.log('done')
    });

    this.gameService.getCategoria().subscribe({
      next: value => this.categorias = value,
      error: err => console.error(err),
      complete: () => console.log('done')
    })
  }

//---------------------submit--------------------
  onSubmit() {
    if (this.editar) {

      this.gameService.updateGame(this.formGame.getRawValue()).subscribe(
        {
          next: value => {
            this.loadGamesList();
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
    } else {
      this.gameService.addGame(this.formGame.getRawValue()).subscribe(
        {
          next: value => {
            this.loadGamesList();
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
  //---------------------submit--------------------

  //---------------------loadGame--------------------

loadGame(game :Game){
  console.log(game);
    this.formGame.setValue(game);
    this.editar = true;
}



  //---------------------loadGame--------------------

  //---------------------newGame--------------------

  newGame(){
    this.formGame.reset();
    this.editar = false;
  }

  //---------------------newGame--------------------

  //---------------------newcategoria--------------------
  addNewCategoria(){

      this.categorias.push(this.newCategoria.value);
      this.formGame.setControl('categoria',new FormControl(this.newCategoria.value))
      this.mynewCategoria.reset();
  }


  //---------------------newcategoria--------------------


  //---------------------REMOVE GAME--------------------


  deleteGame(game: Game){
    if(confirm('Desea borrar' + game.nombre + '?'))
    {
      this.gameService.deleteGame(game._id).subscribe(
        {
          next: value => {
            this.loadGamesList();
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


  //---------------------REMOVE GAME--------------------


  protected readonly faTrashAlt = faTrashAlt;
}

