/*global angular*/
angular.module('GeneradorInformes')
    .controller('RegistroController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.registroCompletado = function () {
            $rootScope.informacionUsuario = $scope.informacionUsuario;
            $location.path('/cargando');
        };
    }]);
