var app = angular.module('read',[]);

function readController($scope,$http) {
    $scope.items = $http.get('data/unread.json')
                        .success(function (data,status,headers,config) {
                            $scope.items = data;
                        }).error(function (data,status,headers,config) {
                            console.log('Error getting data/unread.json');
                        });   
    $scope.genres = $http.get('data/genres.json')
                        .success(function (data,status,headers,config) {
                            $scope.genres = data;
                        }).error(function (data,status,headers,config) {
                            console.log('Error getting data/genres.json');
                        });
    $scope.selectedItem = ''; 
    $scope.rating = "***";
    var d = new Date();
    $scope.dateRead = d.toISOString().split('T')[0];    
    
    
    $scope.update = function () {
        var update = 
                     {
                         "bookId": $scope.selectedItem,
                         "date": $scope.dateRead,
                         "genre":$scope.genre,
                         "rating":$scope.rating
                     };
        $http.post('update/read',update).success(function (data,status,headers,config) {
                            console.log('Update successful');
                        }).error(function (data,status,headers,config) {
                            console.log('Error posting');
                        });  
    }
}


