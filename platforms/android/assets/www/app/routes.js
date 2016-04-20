app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $stateProvider

    .state('menu', {
        url: "/menu",
        abstract: true,

        templateUrl: "views/menu.html"
        })

    .state('menu.movies', {
     url: '/movies',
        views: {
            'menuContent' :{
                templateUrl: "views/movies/movies-list.html",
                controller: 'MoviesListCtrl',
            }
        }

    })

    .state('movies-top-rated', {
        url: '/movies/top-rated',
        templateUrl: "views/movies/movies-list.html",
        controller: 'MoviesTopRatedCtrl'
    })

    .state('menu.movies-detail', {
        url: '/movies/:id',
        views: {
            'menuContent' :{
                templateUrl: "views/movies/movies-detail.html",
                controller: 'MoviesDetailCtrl'
            }
        }
    })


    .state('menu.profile', {
        url: '/profile',
        views: {
            'menuContent' :{
                templateUrl: "views/main/profile.html",
                controller: 'ProfileCtrl'
            }
        }
    })
    
    
    // states end
    ;

    $urlRouterProvider.otherwise('/menu/movies');

    $ionicConfigProvider.scrolling.jsScrolling(false);
});