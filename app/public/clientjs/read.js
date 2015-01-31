var app = angular.module('read',[]);

function readController($scope,$http) {
    $scope.items = $http.get('data/unread.json')
                        .success(function (data,status,headers,config) {
                            $scope.items = data;
                        }).error(function (data,status,headers,config) {
                            console.log('Error getting data/unread.json');
                        });    
    $scope.selectedItem = ''; 
    $scope.rating = "***";
    var d = new Date();
    $scope.dateRead = d.toISOString().split('T')[0];    
}


function update() {
    alert('Update');
}