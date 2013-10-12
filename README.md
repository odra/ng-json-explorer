ng-json-explorer
================

json explorer angular directive

Usage
-------------------------
Check the demo folder (demo.html) for a simple example.

Including the required files (js and css)
-------------------------
```
<script src="gd-ui-jsonexplorer.js"></script> 
<link rel="stylesheet" type="text/css" media="screen" href="../src/gd-ui-jsonexplorer.css" />
```

Send the json data to your template
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

Using the directive to display the data
-------------------------
```
<json-explorer json-data="{{data}}"></json-explorer>
```
