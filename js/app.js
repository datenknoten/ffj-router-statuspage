function doRequest($scope,$interval,$http) {
     $http({
        method: 'GET',
        url: '158.gz',
        responseType: "arraybuffer"
    }).then(function successCallback(response) {
        var input = response.data;
        input = Uint8Array(input);
        var gunzip = new Zlib.Gunzip(input);
        var plain = gunzip.decompress();
        plain = JSON.parse(String.fromCharCode.apply(null, plain));
        $scope.hostname = plain.hostname;
        $scope.nodeid = plain.node_id;
        angular.extend($scope, {
            location: {
                lat: plain.location.latitude,
                lng: plain.location.longitude,
                zoom: 18
            },
            markers: {
                routerloc: {
                    lat: plain.location.latitude,
                    lng: plain.location.longitude,
                    message: plain.hostname
                }
            }
        });
        
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $http({
        method: 'GET',
        url: '159.gz',
        responseType: "arraybuffer"
    }).then(function successCallback(response) {
        var input = response.data;
        input = Uint8Array(input);
        var gunzip = new Zlib.Gunzip(input);
        var plain = gunzip.decompress();
        plain = JSON.parse(String.fromCharCode.apply(null, plain));
        $scope.uptime = plain.uptime;
        $scope.memory_data[0] = [plain.memory.free,plain.memory.cached,plain.memory.buffers,plain.memory.total-plain.memory.buffers-plain.memory.cached-plain.memory.free];
        $scope.memory_data[1] = [plain.memory.total,plain.memory.total,plain.memory.total,plain.memory.total];
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });    
}

function RouterController($scope,$interval,$http) {
    $scope.hostname = '';
    $scope.nodeid = '';
    $scope.uptime = 0;

    angular.extend($scope, {
        location: {
            lat: 51.505,
            lng: -0.09,
            zoom: 12
        },
        markers: {}
    });

    $scope.client_labels = ["WLAN", "WLAN 2,4 GHz", "WLAN 5 GHz"];
    $scope.client_data = [[10,2,8],[10,10,10]];
    $scope.client_series = ["Einzeln","Total"]

    $scope.memory_labels = ["Frei", "Cache", "Gebuffert","In Benutzung"];
    $scope.memory_data = [[10,2,8],[10,10,10]];
    $scope.memory_series = ["Einzeln","Total"]

    $scope.chart_options = {
        animation : false,
        responsive: true
    };

    doRequest($scope,$interval,$http);
    $interval(function(){
        doRequest($scope,$interval,$http);
    },5000);
}

(function (angular) {
    'use strict';
    angular.module('RouterApp',['chart.js','leaflet-directive'])
        .controller('RouterController',['$scope','$interval','$http',RouterController]);
})(window.angular);
