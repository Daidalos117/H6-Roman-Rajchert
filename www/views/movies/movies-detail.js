app.controller('MoviesDetailCtrl', function ($scope, $rootScope, MoviesService,$stateParams,$ionicModal,GlobalService,ContactsService) {
    if($stateParams){
        GlobalService.loadingShow();
        var movieId = +$stateParams.id;
        MoviesService.getMovieById(movieId).then(function (result) {
            console.log(result);
            $scope.movie = result;
            loadCountryChart(result.production_countries);
            GlobalService.loadingHide();
        });

    }
    
    $scope.toggleWatched = function(){
        MoviesService.toggleWatched(movieId);
    };
    $scope.isMovieWatched = function () {
        return MoviesService.isMovieWatched(movieId);
    };


    var loadCountryChart = function (chartData) {
        $scope.chartObject = {};

        $scope.chartObject.type = "GeoChart";

        $scope.chartObject.data = [
            ['Locale']
        ];

        var countries = [];
        chartData.forEach(function (item) {
            countries.push([item.name]);
        });

        $scope.chartObject.data = $scope.chartObject.data.concat(countries);

        $scope.chartObject.options = {
            tooltip: {
                isHtml: true,
                trigger: 'both'
            }
        };

    }

    $scope.countrySelected = function (country) {
        console.log(country);
    }



    $ionicModal.fromTemplateUrl('views/movies/contacts-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.contactsModal = modal;
    });

    $scope.share = function(type){
        switch(type){
            case "twitter":
                window.plugins.socialsharing.shareViaTwitter('I love this ' + $scope.movie.title);
                break;
            case "email":
                GlobalService.loadingShow();
                ContactsService.getContacts().then(function(contacts){
                    $scope.contacts = contacts;
                    $scope.contactsModal.show();
                    GlobalService.loadingHide();
                });
                break;
            default: console.warn("");break;
        }
    }


    $scope.shareOnEmail = function(contact){
        var message = 'Dear '+contact.name.familyName+',\nI love this movie!! <3 '+ $scope.movie.title+'';
        window.plugins.socialsharing.shareViaEmail(
            message, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
            'Subject',
            [contact.emails[0].value], // TO: must be null or an array
            null, // BCC: must be null or an array
            null, // FILES: can be null, a string, or an array
            function(){ // Success callback
                $scope.contactsModal.hide();
            }
        );
    }



})