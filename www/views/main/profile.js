app.controller('ProfileCtrl', function ($scope, $rootScope, $ionicPopup,GlobalService,ProfileService,APP_CONFIG,$cordovaCamera) {




    ProfileService.getInfo().then(function (data) {

        var formData = data.rows.item(0);
        console.log(formData);
        $scope.data = {
            name: formData.name,
            email: formData.email,
            description: formData.description,
            imageData: formData.image,
        };
    });


    $scope.form = function () {

        ProfileService.updateInfo($scope.data).then(function () {
            $ionicPopup.alert({
                title: 'Thank you',
                content: 'Your info was updated.'
            })
        },function () {
            $ionicPopup.alert({
                title: 'Sorry',
                content: 'Something went wrong.'
            })
        })

    };

    $scope.camera = function () {


        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,

            encodingType: Camera.EncodingType.JPEG,

            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            $scope.imageData = "data:image/jpeg;base64," + imageData;
            ProfileService.updateImage(imageData);
        }, function (err) {
            // error
        });


    }

})