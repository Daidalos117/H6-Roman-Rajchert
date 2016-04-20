app.constant("APP_CONFIG", {
    debugMode: true,
    storagePrefix: "test_",
    defaultState: "/menu/home",

    apiKey: "4aa883f95999ec813b8bfaf319f3972b",
    apiUrl: "api.themoviedb.org/3/",
    apiEndpoints: {
        moviesPopular: "movie/popular",
        movieDetail: "movie/"
    },

    getApiUrl: function (endpoint, plus){
        return "http://" + this.apiUrl + this.apiEndpoints[endpoint] + plus +
        "?api_key="+ this.apiKey;
    }
});