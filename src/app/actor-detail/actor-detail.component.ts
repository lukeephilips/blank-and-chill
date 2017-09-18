import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actor } from '../actor.model';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
  providers: [ ActorService, MovieService ]
})
export class ActorDetailComponent implements OnInit {
  actor: Actor;
  newActor;
  credits: Object[] =[];
  role: string;
  newCredits;
  moviesActedIn= [];
  moviesDirected= [];
  moviesWritten= [];
  moviesProduced= [];
  showMoviesActed: boolean = false;
  showMoviesDirected: boolean = false;
  showMoviesWritten: boolean = false;
  showMoviesProduced: boolean = false;
  selectedRole: string = "showAll";
  mostRecentMoviesOn: boolean = true;
  mostRecentDirectedOn: boolean = true;
  mostRecentProducedOn: boolean = true;
  mostRecentWrittenOn: boolean = true;




  constructor(private actorService: ActorService, private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let personGbID: string;
    let actorTmdbID: string;
    var newCredits;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      personGbID = urlParametersArray['id'];
      this.role = urlParametersArray['role'];

    })
    this.actorService.getActorDetails(personGbID, this.role).subscribe(response => {
      this.newActor = response;
      this.newActor = JSON.parse(this.newActor._body);
      var headshot = "https://image.tmdb.org/t/p/w185/".concat(this.newActor.profile_path);
      this.actor = new Actor(this.newActor.id, this.newActor.name, this.newActor.biography, this.newActor.imdb_id, headshot);
      actorTmdbID = this.newActor.id;

      this.actorService.getActorCredits(actorTmdbID).subscribe(creditResponse => {
        var posterPrefix = "https://image.tmdb.org/t/p/w185/";
        this.newCredits = creditResponse;
        this.newCredits = JSON.parse(this.newCredits._body);

        this.newCredits.cast.forEach(film => {
          if (film.poster_path !== null ){
            this.moviesActedIn.push(film)
            this.showMoviesActed = true
          }
        })
        this.newCredits.crew.forEach(film => {
          if(film.job === 'Director' && film.poster_path){
            this.moviesDirected.push(film)
            // this.moviesDirected = this.moviesDirected.sort(this.compare);
            this.showMoviesDirected = true
          } else if (film.job === 'Screenplay' && film.poster_path){
            this.moviesWritten.push(film)
            // this.moviesWritten = this.moviesWritten.sort(this.compare);
            this.showMoviesWritten = true
          } else if (film.department === 'Production' && film.poster_path){
            this.moviesProduced.push(film)
            // this.moviesProduced = this.moviesProduced.sort(this.compare);
            this.showMoviesProduced = true

          }
        })

      })
    })
  }

  compare (a,b) {
    if (a.release_date && b.release_date) {
      if (a.release_date.split('-').join('') > b.release_date.split('-').join(''))
        return -1;
      if (a.release_date.split('-').join('') < b.release_date.split('-').join(''))
        return 1;
      return 0;
    }

  }

  mostRecentMovies() {
    this.moviesActedIn = this.moviesActedIn.sort(this.compare);
    this.mostRecentMoviesOn = false;
  }

  mostRecentDirector() {
    this.moviesDirected = this.moviesDirected.sort(this.compare);
    this.mostRecentDirectedOn = false;
  }

  mostRecentProducer() {
    this.moviesProduced = this.moviesProduced.sort(this.compare);
    this.mostRecentProducedOn = false;
  }

  mostRecentWriter() {
    this.moviesWritten = this.moviesWritten.sort(this.compare);
    this.mostRecentWrittenOn = false;
  }


  navigateToMovie(tmdbID: string, media_type): void{
    if(media_type === "movie") {
      var foundMovie;
      this.movieService.getMovieByTmdbID(tmdbID).subscribe(response => {
        foundMovie = response;
        foundMovie = JSON.parse(foundMovie._body);
        if(Object.keys(foundMovie).length === 0){
          alert('No streaming data available for this film. Try another.')
        } else {
          this.router.navigate(['movie', foundMovie.id]);
        }
      })
    } else if (media_type === "tv" ){
      this.router.navigate(['show', tmdbID]);
    }
  }

  toggleShow(role) {
    this.selectedRole = role;
    this.showMoviesActed = false;
    this.showMoviesDirected = false;
    this.showMoviesWritten = false;
    this.showMoviesProduced = false;

    if (role === 'showAll') {
      this.showMoviesActed = true;
      this.showMoviesDirected = true;
      this.showMoviesWritten = true;
      this.showMoviesProduced = true;
    } else {
      this[role] = true;
    }

  }

  actorActive() {
    if (this.moviesActedIn.length === 0) {
      return 'hidden'
    } else if (this.selectedRole === 'showMoviesActed' || this.selectedRole === 'showAll') {
      return 'btn btn-success'
    } else {
      return 'btn btn-default'
    }
  }

  directorActive() {
    if (this.moviesDirected.length === 0) {
      return 'hidden'
    } else if (this.selectedRole === 'showMoviesDirected' || this.selectedRole === 'showAll') {
      return 'btn btn-success'
    } else {
      return 'btn btn-default'
    }
  }

  writerActive() {
    if (this.moviesWritten.length === 0) {
      return 'hidden'
    } else if (this.selectedRole === 'showMoviesWritten' || this.selectedRole === 'showAll') {
      return 'btn btn-success'
    } else {
      return 'btn btn-default'
    }
  }

  producerActive() {
    if (this.moviesProduced.length === 0) {
      return 'hidden'
    } else if (this.selectedRole === 'showMoviesProduced' || this.selectedRole === 'showAll') {
      return 'btn btn-success'
    } else {
      return 'btn btn-default'
    }
  }

  allActive() {
    if (this.selectedRole === "showAll") {
      return 'hidden'
    } else {
      return 'btn btn-default'
    }
  }
}
