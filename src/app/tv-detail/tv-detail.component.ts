import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';
import { Show } from '../show.model';
import { AngularFire, AuthProviders, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css'],
  providers: [MovieService, UserService, ActorService]
})
export class TvDetailComponent implements OnInit {
  user;
  fbUser;
  show;
  foundShow;
  userFavorite;
  showApiDetails = {};
  topBilled = [];
  actorsImages = [];

  constructor(private movieService: MovieService, private actorService: ActorService, private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire, private us: UserService) {
    us.checkForUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.fbUser = this.us.getUserFB(this.user);
        this.fbUser.subscribe(fbUser => {
          if (!fbUser.favoriteShows){
            fbUser.favoriteShows = [];
          }
          if (fbUser.favoriteShows && this.show){
            this.userFavorite = fbUser.favoriteShows.includes(this.foundShow.id);
          }
        })
      }
    });
  }

  ngOnInit() {
    var movieID;
    this.activatedRoute.params.forEach((urlParametersArray) => {
      movieID = urlParametersArray['id'];
    });

    this.movieService.getShowDetails(movieID).subscribe(response => {
      this.show = response;
      this.show = JSON.parse(this.show['_body']);
      var poster = "http://image.tmdb.org/t/p/w185//".concat(this.show.poster_path);
      var banner = "http://image.tmdb.org/t/p/w185//".concat(this.show.backdrop_path);
      this.foundShow = new Show(this.show.title, this.show.id, this.show.id, this.show.overview, poster, banner, this.show.rating, this.show.networks[0].name, this.show.cast, this.show.first_air_date);

      this.movieService.getMovieCast(movieID, "tv").subscribe(res => {
          this.showApiDetails['cast'] = response;
          this.showApiDetails['cast'] = JSON.parse(res['_body']);

          this.show.cast = this.showApiDetails['cast'].cast;
          this.topBilled = this.show.cast.splice(0,5);

          this.topBilled.forEach(actor => {
            var characterName = actor.character;
            var actorDetails;
            this.actorService.getActorDetails(actor.id, "cast").subscribe(res => {
              actorDetails = res;
              actorDetails = JSON.parse(actorDetails['_body']);
              var headshot = "http://image.tmdb.org/t/p/w185//".concat(actorDetails.profile_path);
              if (!headshot){
                actorDetails.images['medium'] = {
                  'url': '/assets/img/person-placeholder.png'
                };
              }
          })
        })
      })
    })
  }

  addToFavorites() {
    this.userFavorite = true;
    this.us.addToFavoriteShows(this.show, this.user);
  }
  removeFromFavorites(){
    this.userFavorite = false;
    this.us.removeFromFavoriteShows(this.show, this.user);
  }

  navigateToActorById(castMemberID: string){
    this.router.navigate(['person', castMemberID]);
  }
}
