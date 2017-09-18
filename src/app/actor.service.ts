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
    return this.http.get("https://api-public.guidebox.com/v2/person/".concat(personID).concat("/?api_key=").concat(this.getGBAPIKey()).concat("&role=").concat(role))
  }
  getActorCredits(actorTmdbID: string){
    return this.http.get("https://api.themoviedb.org/3/person/".concat(actorTmdbID).concat("/combined_credits?api_key=").concat(Keys.tmdb).concat("&language=en-US"));
  }
  getActorWithImages(name: string){
    return this.http.get("http://api-public.guidebox.com/v2/search?api_key=".concat(this.getGBAPIKey()).concat("&type=person&query=").concat(name)).map(res => {
      return <any[]> res.json();
    })
  }
}
