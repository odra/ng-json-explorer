# ng-json-explorer

Simple json explorer angular directive that uses raw json data as source.

This module is based in the firefox jsonview extenrsion made by Ben Hollis: https://github.com/bhollis/jsonview/

<<<<<<< HEAD
## Usage

Check the demo folder (demo/demo.html) for examples.

## Installation

```
bower install ng-json-explorer
```

## Module dependency

```js
angular
.module('app', ['ngJsonExplorer'])
```

Files to be used in production are located in the folder "ng-json-explorer/dist"

## Including the required files (js and css)

```html
<script src="angular-json-explorer.min.js"></script> 
<link rel="stylesheet" type="text/css" media="screen" href="angular-json-explorer.css" />
```

## Sending the json data to your template

```js
$scope.data = {
	"name": "Json Explorer",
	"qty": 10,
	"has_data": true,
	"arr": [
		10,
		"str",
		{
			"nested": "object"
		}
	],
	"obj": {
		"hello": "world"
Usage
-------------------------
Check the demo folder (demo.html) for a simple example.

Including the required files (js and css)
-------------------------
```
<script src="gd-ui-jsonexplorer.js"></script> 
<link rel="stylesheet" type="text/css" media="screen" href="../src/gd-ui-jsonexplorer.css" />
```

Sending the json data to your template
-------------------------
```
$scope.data = {
	'name': 'Json Explorer',
	'qty': 10,
	'has_data': true,
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
```

## Using the directive to display the data (you can use either "json-data" or "data")

```html
<json-explorer json-data="data"></json-explorer>
<json-explorer data="data"></json-explorer>
```

## Using the directive to display the data from a URL

```html
<json-explorer url="http://myurl.com"></json-explorer>
```

## Using the collapsed attribute

```html
<json-explorer json-data="data" collapsed="true"></json-explorer>
<json-explorer data="data" collapsed="true"></json-explorer>
```
Using the directive to display the data
-------------------------
```
<json-explorer json-data="data"></json-explorer>
<json-explorer data="data"></json-explorer>
```

Using the directive to display the data from a URL
-------------------------
```
<json-explorer url="http://myurl.com"></json-explorer>
```
Using the collapsed attribute
-------------------------
```
<json-explorer json-data="data" collapsed="true"></json-explorer>
<json-explorer data="data" collapsed="true"></json-explorer>
```
