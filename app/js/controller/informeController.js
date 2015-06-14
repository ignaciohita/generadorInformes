/*global angular*/
angular.module('GeneradorInformes')
    .controller('InformeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.resultados = {};
        $scope.resultados.lista = [];
        $scope.resultados.nombre = $rootScope.resultadoInforme.nombre;

        if ($rootScope.resultadoInforme.error) {
            $scope.resultados.error = $rootScope.resultadoInforme.error;
        } else {
            $scope.resultados.lista = $rootScope.resultadoInforme.lista;
        }
    }]);
