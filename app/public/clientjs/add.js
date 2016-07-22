var app = angular.module('add',[]);

function addController($scope,$http) {
    $scope.authors = $http.get('data/authors.json')
                        .success(function (data,status,headers,config) {
                            $scope.authors = data;
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
                         "authorId": $scope.author,
                         "date": $scope.dateRead,
                         "genre":$scope.genre,
                         "rating":$scope.rating,
                         "title":$scope.title,
                         "pages":$scope.pages,
                         "language":$scope.language
                     };
        $http.post('update/addBook',update).success(function (data,status,headers,config) {
                            alert('Update successful');
                        }).error(function (data,status,headers,config) {
                            alert('Error posting');
                        });  
    }
}



