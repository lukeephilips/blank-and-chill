# _StreamSearch_

#### By _**Levi Bibo, Luke Philips, Erica Nafziger, and Jonathan Thom**_

#### _StreamSearch allows users to find where their favorite movies are streaming, as well as information about TV Shows, Actors, Directors, and Writers. It has a powerful search feature, as well as incorporating user authentication. Once logged in, a user may save movies and shows as 'favorites' to be viewed later._

## Setup/Installation Requirements

_View at: [https://streamsearch-21151.firebaseapp.com/](https://streamsearch-21151.firebaseapp.com/)_

_For developers, from the command line run:_
```
git clone https://github.com/lukeephilips/blank-and-chill
cd blank-and-chill
npm install
bower install
touch src/app/api-key.ts
```

_Then:_
  1. Get a Guidebox API Key from [https://api.guidebox.com/](https://api.guidebox.com/).
  2. Get a TMDB API Key from [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)
  3. Create a new Firebase Project at [https://firebase.google.com/](https://firebase.google.com/)
    - In Database, set rules.read and rules.write both to 'true'
    - In Authentication, enable Google and Email/Password.
    - Fetch Firebase Key Info from Overview > Add Firebase to Your Web App


_Then, in src/app/api-keys.ts, plug in the fetched keys in the following format:_
  ```
  export var Keys = {
    tmdb:'{Your-TMDB-Key}',
    guidebox:['{Your-Guidebox-Key}']

  }
  export var masterFirebaseConfig = {
    apiKey: "{Your-API-Key}",
    authDomain: "{Your-Firebase-Domain}",
    databaseURL: "{Your-Database-URL}",
    storageBucket: "{Your-Storage-Bucket-URL}",
    messagingSenderId: "{Your-Message-Sender-Id}"
  }
  ```
_Finally, in the command line, run:_
  ```
  ng serve
  ```
  _And navigate to localhost:4200_

## Known Bugs

1. Users must refresh their account page in order to remove a movie from favorites.

## Support and Contact Details

_Find the developers on GitHub: [Levi](https://github.com/levibibo), [Luke](https://github.com/lukeephilips), [Erica](https://github.com/ericanafziger), [Jonathan](https://github.com/jonathanwthom)_

## Technologies Used

_Angular 2, TypeScript, SASS, HTML_

### License

*MIT*

Copyright (c) 2016 **_Levi Bibo, Luke Philips, Erica Nafziger, and Jonathan Thom_**
