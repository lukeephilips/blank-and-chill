export class Movie {
  public overview: string;
  public genre: Object[];
  public tags: Object[];
  public duration: number;
  public trailers: Object[];
  public writers: Object[];
  public directors: Object[];
  public purchase_web_sources: Object[];
  public backdrop: string;
  public cast: Object[];
  public sources: Object[];


  constructor(public title: string, public id: string, public release_year: string, public in_theatres: boolean, public release_date: string, public rotten_tomatoes: number, public metacritic: string, public poster_small: string, public poster_medium: string, public poster_large: string, public themoviedb: number, public rating: string) {}
}
