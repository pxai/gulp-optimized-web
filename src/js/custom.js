/**
* custom.js
* Custom JavaScript files
*/
var Greeter = function () {
	var greet = function () { 
		console.log('ok, greeting is ready');
	};
};

$(document).ready(function () {
	$('#fire').click(function (e) {
		console.log('Button clicked');
		$('#myModal').modal('show');
	});
});
