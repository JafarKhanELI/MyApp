(function () {
    "use strict";

    var app = angular.module("myApp", ["ngRoute", "commonServices"]);

    app.config(function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "app/main.html"
        })
        .when("/login", {
            templateUrl: "app/login.html"
        })
        .when("/register", {
            templateUrl: "app/register.html"
        })
        .when("/editlink", {
            templateUrl: "app/editlink.html"
        })
        .when("/createLink", {
            templateUrl: "app/createLink.html"
        })
        ;
    });

}());