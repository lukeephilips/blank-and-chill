import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../movie.service';
import { ActorService } from '../actor.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [MovieService, ActorService]
})
export class SearchResultsComponent implements OnInit {

  category: string;
  term: string;
  filter;
  itemsToDisplay: Object[] =[];
  apiResults;
  parsedMovies = [];
  foundMovies = [];
  unique = null;

  constructor(private route: ActivatedRoute, private router: Router, private ms: MovieService, private as: ActorService) { }

  ngOnInit() {

    this.route.params.forEach((urlParameters) => {
      this.category = urlParameters['category'];
      this.term = urlParameters['term'];

// changed filter to convert passed string back into an array
      this.filter = urlParameters['filter'].split(',');


      if(this.category === "person"){
        this.as.getActorWithImages(this.term).subscribe(results => {
         this.apiResults = JSON.parse(results._body);
         console.log(this.apiResults);
         this.itemsToDisplay = this.apiResults.results;
        })
      } else if (this.category === 'show') {
        this.ms.getResultsByTerm('tv', this.term).subscribe(x => {
          console.log(x);
          this.apiResults = x;
          this.itemsToDisplay = this.apiResults.results;
        });
      } else {
        this.ms.getResultsByTerm(this.category, this.term).subscribe(x => {
          this.itemsToDisplay.length = 0;
          this.parsedMovies.length = 0;
          this.apiResults = x;

          this.itemsToDisplay = this.apiResults.results;

// Wire API call for each movie to find streaming sources

          // this.apiResults.results.forEach(movie => {
          //   this.ms.getMovieDetails(movie.id).subscribe(y => {
          //     this.parsedMovies.push(JSON.parse(y['_body']));
          //     // if (this.filter[0] === "" ) {
          //       this.unique = this.parsedMovies.filter(function(elem, index, self) {
          //         return index == self.indexOf(elem);
          //       })
          //       this.itemsToDisplay = this.unique;
              // } else if 2 === 3 {
//                 this.parsedMovies.forEach(movie => {
//                   movie.subscription_web_sources.forEach(source => {
//
// // changed function to test each value in filter array
//                     if (this.filter.some(x => x === source.display_name)) {
//                       this.foundMovies.push(movie);
//                     }
//                   })
//                 })
//                 this.unique = this.foundMovies.filter(function(elem, index, self) {
//                   return index == self.indexOf(elem);
//                 })
//                 this.itemsToDisplay = this.unique;
//                 this.foundMovies.length = 0;
//                 this.unique = null;
              // }
          //   });
          // })
        })
      }
    });
  }

  goToPage(id) {
    id = id.toString();
    this.router.navigate([this.category, id]);
  }

  goToPersonPage(id) {
    id = id.toString();
    this.router.navigate([this.category, id]);
  }

}
