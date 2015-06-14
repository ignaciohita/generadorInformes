/*global angular, progresoCarga*/
angular.module('GeneradorInformes')
    .controller('CargandoController', ['$rootScope', '$scope', '$location', 'InformeService', function ($rootScope, $scope, $location, InformeService) {
        'use strict';

        $scope.iniciarCargaInforme = function () {
            InformeService.generar($rootScope.informacionUsuario).then(function (resultado) {
                $rootScope.resultadoInforme = resultado.data;
            }).catch(function (resultado) {
                $rootScope.resultadoInforme = {
                    error: true,
                    resultado: resultado
                };

                $rootScope.resultadoInforme.resultado.nombre = $rootScope.informacionUsuario.nombre;
            }).finally(function (resultado) {
                $location.path('/informe');
            });
        };
    }]);
