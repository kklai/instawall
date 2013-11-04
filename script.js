var ig;
var data;
var width;
var img_width;
var id = [];

function setWidth() {
  width = $(window).width();
  if (width > 1200) {
    img_width = Math.floor(width / 6.2);
  } else if (width > 500){
    img_width = Math.floor(width / 4.1);
  } else if (width <= 500) {
    img_width = Math.floor(width / 2.1);
  }
  $(".ig").css('width', img_width + 'px');
}

function getId(){
  for (var i = 0; i < users.length; i++) {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "https://api.instagram.com/v1/users/search?q=" + users[i] +"&access_token=" + access_token,
      cache: true,
      success: function(data) {
        id.push(data.data[0].id);
      }
    });
  }
}

var count = 0;
function getInstagram() {
  var randomId = id[Math.floor(Math.random()*id.length)];
  url = "https://api.instagram.com/v1/users/" + randomId + "/media/recent/?access_token=" + access_token;
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: true,
    url: url,
    success: function(data) {
      ig = data;
      ig = ig.data;
      if (count === 0) {
        instagramfeed(ig);
        setWidth();
        count ++;
      }
    }
  });
}

var video_compiled = _.template('<a href="<%= link %>" target="_blank"><video width="100%" height="width" autoplay muted loop transparent><source src="<%= videos.standard_resolution.url %>" type="video/mp4"></video></a>');

var img_compiled = _.template('<a href="<%= link %>" target="_blank"><img src="<%= images.standard_resolution.url %>"/></a>');

var counter = 0;
function instagramfeed(input) {
  var id = Math.floor((Math.random()*20)+1);
  for (var i = 0; i < (input.length - 2); i++) {
    counter += 1;
    if (input[i].type == "video") {
      $('body').append('<div class="ig" id="' + counter + '">' + video_compiled(input[i]) + '</div>');
    } else {
      $('body').append('<div class="ig" id="' + counter + '">' + img_compiled(input[i]) + '</div>');
    }
  }
}

function update() {
  var box = Math.floor((Math.random()*18)+1);
  var numb = Math.floor((Math.random()*18)+1);
  $('#' + box).fadeOut('slow', function(){
    if (ig[numb].type == "video") {
      $(this).html(video_compiled(ig[numb]));
    } else {
      $(this).html(img_compiled(ig[numb]));
    }
  }).fadeIn('slow');
}

function setTimeInterval() {
  window.setInterval(update, 3000);
  window.setInterval(getInstagram, 6000);
}

$( document ).ready(function() {
  getId();
});

$(window).load(function() {
  setWidth();
  getInstagram();
  getInstagram();
  setTimeInterval();
});

$(window).resize(function(){
  setWidth();
});


