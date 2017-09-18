import { Injectable } from '@angular/core';
import { Actor } from './actor.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Keys } from './api-keys';

@Injectable()
export class ActorService {

  constructor(private http: Http) { }

  getGBAPIKey(): string{
    return ""
  }

  getActorDetails(personID: string, role: string){
    return this.http.get("https://api.themoviedb.org/3/person/".concat(personID).concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US"));

  }
  getActorCredits(actorTmdbID: string){
    return this.http.get("https://api.themoviedb.org/3/person/".concat(actorTmdbID).concat("/combined_credits?api_key=").concat(Keys.tmdb).concat("&language=en-US"));
  }
  getActorWithImages(name: string){
    return this.http.get("https://api.themoviedb.org/3/search/person".concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US&query=").concat(name));
  }
}
