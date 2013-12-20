var access_token;
function authenticateUser(){
	// let user login
	if (access_token === undefined) {
		OAuth.initialize('eurVsf8yPYqHOUYoBEwMwyaZMCg');
  	OAuth.popup('instagram', function(error, result) {
	  	//handle error with error
	  	//use result.access_token in your API request
	  	access_token = result.access_token;
	  	redirect();
		});
	} else {
		redirect();
	}
}

function redirect(){
	window.location = "/instawall.html" + "?access_token=" + access_token;
}

$(document).ready(function(){
	$('.login').click(function(){
		authenticateUser();
	})
});
