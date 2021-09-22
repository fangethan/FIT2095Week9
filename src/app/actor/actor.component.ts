import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetActors()
    this.onListMovies()
  }

  fullName: string = "";
  actorId: string = "";
  bYear: number = 0;

  actorsDB: any[] = [];

  movieID: string = "";
  title: string = ""
  year: number = 0
  actors: any[] = [];

  year1: number = 0;
  year2: number = 0;

  moviesDB: any[] = [];

  section = 1;

  changeSection(sectionId: number) {
    this.section = sectionId;
  }

  // a new section to add a movie
  onSaveMovie() {
    let obj = { title: this.title, year: this.year, actors: this.actors };
    this.dbService.addMovie(obj).subscribe(result => {
      this.onListMovies();
    });
  }
  // a new section to list all the available movies
  onListMovies() {
    this.dbService.listAllMovies().subscribe((data: any) => {
      this.moviesDB = data;
      console.log(this.moviesDB)
    });
  }

  // a new section to delete a movie by aTitle
  onDeleteMovieTitle() {
    this.dbService.deleteMovieTitle(this.title).subscribe(result => {
      this.onListMovies();
    });
  }
  // a new section to delete all movies produced between aYear1 and aYear2
  onDeleteMovieYear() {
    this.dbService.deleteMovieYear(this.year1, this.year2).subscribe(result => {
      this.onListMovies();
    });
  }
  // a new section to add an actor to a movie
  onSaveExistingActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.addExistingActor(this.movieID, this.actorId, obj).subscribe(result => {
      this.onGetActors();
      this.onListMovies();
    });
  }

  onGetActors() {
    this.dbService.getAllActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onSelectMovie(item: any) {
    this.title = item.title;
    this.year = item.year;
    this.actors = item.actors;
    this.movieID = item._id;
  }

  onSelectActor(item: any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

}
