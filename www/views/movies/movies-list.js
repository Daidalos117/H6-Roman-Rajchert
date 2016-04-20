app.controller('MoviesListCtrl', function ($scope, MoviesService) {
    //$scope.data = MoviesService.data;
    $scope.moredata = false;

    var pages = [];
    $scope.loadMoreData=function()
    {
        
            MoviesService.getMovies(null);
            if (!$scope.data) {
                $scope.data = {};
            }
            if( MoviesService.data ){
                $scope.data = MoviesService.data;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

            if (MoviesService.page == 300) {
                $scope.moredata = true;
            }

    };

    $scope.data = {};

    $scope.$on("$ionicView.enter", function () {
    });

    $scope.$on('$ionicView.enter', function () {
        ga_storage._trackPageview("/movies", "Movies");
    });
    
    $scope.predicate = 'title';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
  };
})