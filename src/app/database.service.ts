import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

// marks a class as available to Injector for creation
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }
  result: any;

  // a new section to add a movie
  addMovie(data: any) {
    return this.http.post("/movies", data, httpOptions);
  }

  // a new section to delete a movie by aTitle
    // the new section has to have one text box to enter the value of aTitle
  deleteMovieTitle(title: string){
    let url = "/movies/title/" + title;
    return this.http.delete(url, httpOptions);
  }

  // a new section to delete all movies produced between aYear1 and aYear2
    // the new section has to have two text boxes to enter two integer values that represent aYear1 and aYear2
  deleteMovieYear(year1: number, year2: number){
    let url = "/movies/deleteall/" + year1 + "/" + year2;
    return this.http.get(url);
  }

  // a new section to add an actor to a movie
    // the section has to show the list of available actors to select one of them
    // and, the list of available movies to select one of them
    // a button to insert the selected movie to the selected actor
    // NOTE: can be verified via Compass
  addExistingActor(movieid: string, actorid: string, data: any){
    let url = "/movies/" + movieid + "/" + actorid;
    return this.http.post(url, data, httpOptions);
  }

  // a new section to list all the available movies
  listAllMovies() {
    return this.http.get("/movies/getall");
  }

  // path names have to match
  getAllActors() {
    return this.http.get("/actors/getall");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id: any, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id: any) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

}
