var app = angular.module('addAuthor',[]);

function addController($scope,$http) {
    
        
    $scope.update = function () {
        var update = 
                     {
                         "firstName": $scope.firstName,
                         "name": $scope.name
                     };
        $http.post('update/addAuthor',update).success(function (data,status,headers,config) {
                            alert('Update successful');
                        }).error(function (data,status,headers,config) {
                            alert('Error posting');
                        });  
    }
}