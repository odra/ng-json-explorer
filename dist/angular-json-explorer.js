/*
Copyright (c) 2013, Goldark <opensource@goldark.com.br>
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

  Neither the name of the {organization} nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
angular.module('ngJsonExplorer', [])
.directive('jsonExplorer', ['$http', function ($http) {
	'use strict';
	return {
		restrict: 'E',
		scope: {
			data: '=',
			url: '=',
			collapsed: '=',
			sortBy: '='
		},
		link: function (scope, elem, attrs) {
			if (!angular.isBoolean) {
				angular.isBoolean = function (value) {
				    return  value === true || value === false || toString.call(value) == '[object Boolean]' || typeof value === 'boolean';
				}
			}
			var collapser = '+';
			var ellipsis = '';
			var contents = 'hidden';
			if (scope.collapsed) {
				collapser = '-';
				ellipsis = 'hidden';
				contents = '';
			}
			var isRaw = function (v) {
				return (angular.isString(v) || angular.isNumber(v) || angular.isBoolean(v) || v === null);
			};
			var isArray = function (v) {
				return angular.isArray(v);
			};
			var isObject = function (v) {
				return angular.isObject(v);
			};
			var parseRaw = function (k, v) {
				var key = '';
				if (k) {
					key = '<span class="prop>">' + k + '</span>: ';
				}
				if (typeof v == 'string') {
					return key + '<span class="string">"' + v + '"</span>';
				}
				if (typeof v == 'number') {
					return key + '<span class="num">' + v + '</span>';
				}
				if (typeof v == 'boolean') {
					return key + '<span class="bool">' + v + '</span>';
				}
				return key + '<span class="null">' + v + '</span>';
			};
			var parseArray = function (k, v) {
				var html = '<span class="prop>"><a href="#" class="collapser">' + collapser + '</a></span> [';
				if (k) {
					html = '<span class="prop>"><a href="#" class="collapser">' + collapser + '</a>' + k + '</span>: [';
				}
				html += '<span class="ellipsis ' + ellipsis + '">...</span>';
				html += '<ul class="array collapsible ' + contents + '">';
				for (var i = 0; i < v.length; i++) {
					if (isRaw(v[i])) {
						html += '<li>' + parseRaw(null, v[i]) + ',</li>';
					} else if (isArray(v[i])) {
						html += '<li>' + parseArray(null, v[i]) + ',</li>';	
					} else if (isObject(v[i])) {
						html += '<li>' + parseObject(null, v[i]) + ',</li>';	
					}
				}
				html = html.replace(/,<\/li>$/gim, '</li>');
				html += '</ul>';
				html += ']';
				return html;
			};
			var parseObject = function (k, v) {
				var html = '<span class="prop>"><a href="#" class="collapser">' + collapser + '</a></span> {';
				if (k) {
					html = '<span class="prop>"><a href="#" class="collapser">' + collapser + '</a>' + k + '</span>: {';
				}
				html += '<span class="ellipsis ' + ellipsis + '">...</span>';
				html += '<ul class="object collapsible ' + contents + '">';
				for (var item in v) {
					if (isRaw(v[item])) {
						html += '<li>' + parseRaw(item, v[item]) + ',</li>';
					} else if (isArray(v[item])) {
						html += '<li>' + parseArray(item, v[item]) + ',</li>';	
					} else if (isObject(v[item])) {
						html += '<li>' + parseObject(item, v[item]) + ',</li>';	
					}
				}
				html = html.replace(/,<\/li>$/gim, '</li>');
				html += '</ul>';
				html += '}';
				return html;
			};
			var html = '';
			function parse(val) {
				var data = null;
				if (!angular.isObject(val)) {
					try {
						data = JSON.parse(val);
					} catch (e) {
						data = {'error': 'invalid json'};
						return;
					}
				} else {
					data = val;
				}
				if (isArray(data)) {
					if (scope.sortBy) {
						data = data.sort(function (a,b) {
							var sort = scope.sortBy.split(':');
							var field = sort[0];
							var order = sort[1];
							var aField = a[field];
							var bField = b[field];
							var orderByNumber = function (n1, n2) {
								return n1 - n2;
							};
							var orderByLength = function (s1, s2) {
								return s1.length - s2.length;
							};
							var method = null;
							if (typeof aField == 'number' && typeof bField == 'number') {
								method = orderByNumber;
							} else if (aField.hasOwnProperty('length') && bField.hasOwnProperty('length')) {
								method = orderByLength;
							} else {
								return;
							}
							if (order == 'asc') {
								return method(aField, bField);
							} else if (order == 'desc') {
								return method(bField, aField);
							}
							return method(aField, bField);
						});
					}
				}
				if (isArray(data)) {
					html = '[<ul class="array">';
				} else if (isObject(data)) {
					html = '{<ul class="object">';
				}
				for (var item in data) {
					var key = item;
					var value = data[item];
					if (isRaw(value)) {
						html += '<li>' + parseRaw(key, value) + ',</li>';
					} else if (isArray(value)) {
						html += '<li>' + parseArray(key, value) + ',</li>';	
					} else if (isObject(value)) {
						html += '<li>' + parseObject(key, value) + ',</li>';	
					}
				}
				html = html.replace(/,<\/li>$/gim, '</li>');
				if (isArray(data)) {
					html += '</ul>]';
				} else if (isObject(data)) {
					html += '</ul>}';
				}
				elem.html('<div class="angular-json-explorer">' + html + '</div>');
				var collections = elem[0].getElementsByTagName('a');
				for (var i = 0; i < collections.length; i++) {
					var collectionItem = collections[i];
					angular
					.element(collectionItem)
					.on('click', function (e) {
						e.preventDefault();
						var el = angular.element(this).parent().next();
						var d = angular.element(this).parent().next().next();
						if (this.innerHTML == '+') {
							el.addClass('hidden');
							d.removeClass('hidden');
							this.innerHTML = '-';
						} else {
							el.removeClass('hidden');
							d.addClass('hidden');
							this.innerHTML = '+';
						}
					});
				}
			}

			scope.$watch('url', function (val) {
				if (val) {
					$http.get(val)
					.success(function (response) {
						scope.requestData = response;
					});
				}
			});

			scope.$watch('data', function (val) {
				if (val) {
					parse(val);
				}
			}, true);

			scope.$watch('requestData', function (val) {
				if (val) {
					parse(val);
				}
			});
			scope.$watch('collapsed', function (val) {
				if (val != undefined) {
					var collections = elem[0].getElementsByTagName('a');
					for (var i = 0; i < collections.length; i++) {
						var collectionItem = collections[i];
						var el = angular.element(collectionItem).parent().next();
						var d = angular.element(collectionItem).parent().next().next();
						if (val == true) {
							if (collectionItem.innerHTML == '-') {
								el.removeClass('hidden');
								d.addClass('hidden');
								collectionItem.innerHTML = '+';
							}
						} else {
							if (collectionItem.innerHTML == '+') {
								el.addClass('hidden');
								d.removeClass('hidden');
								collectionItem.innerHTML = '-';
							}
						}
					}
				}
			});
		}
	};
}]);
