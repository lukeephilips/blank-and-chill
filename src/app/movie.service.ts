import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Keys } from './api-keys';

@Injectable()
export class MovieService {
  backdropPrefix = "https://image.tmdb.org/t/p/w1280/";
  posterPrefix = "https://image.tmdb.org/t/p/w185/";

  constructor(private http: Http) { }

  getGBAPIKey(): string{
    return "";
  }

  getTopMovies() {
    return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=" + Keys.tmdb + "&language=en-US&page=1")
    .map(res => {
      return <any[]> res.json();
    });
  }

  getResultsByTerm(category, term) {
    return this.http.get("https://api.themoviedb.org/3/search/".concat(category).concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US&query=").concat(term)).map(res => {
      return <any[]> res.json();
    });
  }

  getMovieDetails(movieID: string){
    return this.http.get("https://api.themoviedb.org/3/movie/".concat(movieID).concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US&query="));
  }

  getShowDetails(showID: string){
    // return this.http.get("https://api-public.guidebox.com/v2/shows/".concat(showID).concat("/?api_key=").concat(this.getGBAPIKey()));
    return this.http.get("https://api.themoviedb.org/3/tv/" + showID + "?api_key=" + Keys.tmdb + "&language=en-US");
  }

  getMovieImages(tmdbID: string){
    return this.http.get("https://api.themoviedb.org/3/movie/".concat(tmdbID).concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US"));
  }

  getMovieByTmdbID(tmdbID: string){
    return this.http.get("https://api.themoviedb.org/3/movie/".concat(tmdbID).concat("?api_key=").concat(Keys.tmdb).concat("&language=en-US&query="));
  }
  getMovieCast(GbId){
    var res = this.http.get("https://api.themoviedb.org/3/movie/".concat(GbId).concat("/credits").concat("?api_key=").concat(Keys.tmdb));
    console.log(res);
    return res;
  }

}
