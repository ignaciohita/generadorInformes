/*global angular*/
var dependencies = ['ui.bootstrap', 'ngRoute'];

try {
    angular.module("ngMockE2E");
    dependencies.push("ngMockE2E");
} catch (err) {}

var angularApp = angular.module('GeneradorInformes', dependencies);

angularApp.controller('MainController', ['$scope', '$location', 'InformeService', function ($scope, $location, InformeService) {
    'use strict';

    $scope.initApp = function () {
        $location.path('/registro');
    };
}]);

angularApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    'use strict';

    $locationProvider.html5Mode();

    $routeProvider.when('/registro', {
        templateUrl: 'view/registroInformacion.tpl.html',
        controller: 'RegistroController'
    });

    $routeProvider.when('/cargando', {
        templateUrl: 'view/cargandoInforme.tpl.html',
        controller: 'CargandoController'
    });

    $routeProvider.when('/informe', {
        templateUrl: 'view/informeResultados.tpl.html',
        controller: 'InformeController'
    });
}]);
