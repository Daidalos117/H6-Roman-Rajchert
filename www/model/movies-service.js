app.factory('MoviesService', function ($http, APP_CONFIG,$resource) {
    return new (function () {
        var service = this;
        service.data = [];
        service.page = 1;
        service.pages = [];

        service.getMovies = function (callback) {

                if(!~service.pages.indexOf(service.page) ) {
                    service.pages.push(service.page);
                    service.page += 1;

                    $resource(APP_CONFIG.getApiUrl("moviesPopular","") + "&page=" + service.page, {}, {
                        query: {
                            isArray: false
                        }
                    }).query().$promise.then(function (result) {
                        service.data = service.data.concat(result.results);
                    });

                    if (callback) callback();
                    service.getWatchedMoviesFromStorage();
                }
        };
        

        service.getMovieById = function (id) {
            var selectedMovie = {};
            console.log("id" + id);

            return $resource(APP_CONFIG.getApiUrl("movieDetail",id) , {}, {
                query: {
                    isArray: false
                }
            }).query().$promise;

        };
        
      
        
        service.watchedMovies = [];
        service.getWatchedMoviesFromStorage = function () {
            try {
                service.watchedMovies = JSON.parse(
                    localStorage.getItem("watched_movies")
                ) || [];
            } catch (e) {
                console.warn("Invalid JSON string")
            }
            return service.watchedMovies;
        };
        
        service.toggleWatched = function (id) {
            var occurenceIndex = service.watchedMovies.indexOf(id);
            if (~occurenceIndex)
                service.watchedMovies.splice(occurenceIndex, 1);
            else
                service.watchedMovies.push(+id);
            localStorage.setItem("watched_movies", JSON.stringify(
                service.watchedMovies) );
        };
        
        service.isMovieWatched = function (movieId) {
            return !!~service.watchedMovies.indexOf(movieId)
        };
        
        
    })();
 });