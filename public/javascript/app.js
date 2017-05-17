angular.module('blogApp',[])

.controller('blogController',function ($scope,$http) {
	$http.get('/json').then(function (res) {
		$scope.blog = JSON.parse(res.data);
		$scope.blog.reverse();
	});
});

