# Instawall

Browser-based Instagram feed for idle screens
![alt text](https://raw.github.com/kklai/instawall/master/screenshot.png)

### Live Demo
Check out a live demo of the page here.
[here]: http://kkrebeccalai.com/instawall/

### Set up

1. Get a Client ID from [instagram api]
[instagram api]: http://instagram.com/developer/
* Enter this URL in your browser with your Client ID and redirect URL.
https://instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token
* Copy the access token code from the end of the return URL.

2. Replace the text in config_sample.js with your own access token.

3. Change the file name to config.js.

4. Personalize the list of users you want to follow in users.js. (Right now it's a list of news organizations and magazines.)

4. Run the directory on a local host!