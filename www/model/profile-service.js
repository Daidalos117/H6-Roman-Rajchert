app.factory('ProfileService', function ($http, APP_CONFIG,$cordovaSQLite,$ionicPlatform) {
    return new (function () {
        var service = this;
        $ionicPlatform.ready(function () {


            db = $cordovaSQLite.openDB({name: "my.db"});

            //db = window.openDatabase("my.db", "1.0", "Cordova Demo", 200000);

            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS profile (id integer primary key, name text,email text, description text, image text)");
            $cordovaSQLite.execute(db, "INSERT INTO profile values(1,'John', 'john@ss.com', 'Nevermind','')");

            service.addInfo = function () {
                //$cordovaSQLite.execute(db, "INSERT INTO profile values(1,'Roman', 'Rajchert')");
            }
            service.updateInfo = function (data) {
                $cordovaSQLite.execute(db, "UPDATE profile SET name=?, email=?,description=?",
                    [data.name, data.email, data.description]);
            }

            service.updateImage = function (image) {
                $cordovaSQLite.execute(db, "UPDATE profile SET image",
                    [image]);
            }


            service.getInfo = function () {
                return $cordovaSQLite.execute(db, "SELECT * FROM profile where ID=1");
            }

        })
    })();
});
