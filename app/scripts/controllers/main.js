'use strict';

angular.module('ngJsonExplorerApp')
.controller('MainCtrl', function ($scope) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.data = {
				'name': 'Json Explorer',
				'empty_string': '',
				'qty': 10,
				'has_data': true,
				'null_data': null,
				'arr': [
					10,
					'str',
					{
						'nested': 'object'
					}
				],
				'obj': {
					'hello': 'world'
				}
			};
			
});