(function($) {
  var ig, data, width, img_width, id = [];

  function setWidth() {
    width = $(window).width();
    if (width > 1100) {
      img_width = Math.floor(width / 6.2);
    } else if (width > 500){
      img_width = Math.floor(width / 4.1);
    } else if (width <= 500) {
      img_width = Math.floor(width / 2.1);
    }
    $(".ig").css('width', img_width + 'px');
  }

  var row = 0;
  function setHeight(){
    height = $(window).height();
    if (height >= 800)  {
      row = 4;
      $('.instawall').css('margin-top', '-5px');
    } else {
      row = 3;
    }
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

  var video_compiled = _.template('<a href="<%= link %>" target="_blank"><video width="100%" autoplay muted loop transparent><source src="<%= videos.low_resolution.url %>" type="video/mp4"></video></a><div class="insta-label"><p><%= user.username %></p></div>');
  var img_compiled = _.template('<a href="<%= link %>" target="_blank"><img src="<%= images.low_resolution.url %>" width="100%"/></a><div class="insta-label"><p><%= user.username %></p></div>');

  var counter = 0;
  function instagramfeed(input) {
    var id = Math.floor((Math.random()*20)+1);
    for (var i = 0; i < (row * 6); i++) {
      counter += 1;
      if (input[i].type == "video") {
        $('.instawall').append('<div class="ig" id="' + counter + '">' + video_compiled(input[i]) + '</div>');
      } else {
        $('.instawall').append('<div class="ig" id="' + counter + '">' + img_compiled(input[i]) + '</div>');
      }
    }
    setWidth();
  }


  var used_numb = [];
  var numbs = [];
  function update() {
    var box = Math.floor((Math.random()* (row * 6))+1);
    var numb = Math.floor(Math.random()*9);
    for (var i = 0; i < used_numb.length; i++) {
      if (numb === used_numb[i]){
        numb = Math.floor(Math.random()*9);
      }
    }
    used_numb.push(numb);
    if (typeof ig[numb] != "undefined") {
      $('#' + box).fadeOut('slow', function(){
        if ((ig[numb] !== undefined) && ig[numb].type == "video") {
          $(this).html(video_compiled(ig[numb]));
        } else if (ig[numb] !== undefined) {
          $(this).html(img_compiled(ig[numb]));
        }
      }).fadeIn('slow');
    }
  }

  function updateNumbers() {
    used_numb = [];
  }

  function setTimeInterval() {
    window.setInterval(update, 3000);
    window.setInterval(updateNumbers, 10000);
    window.setInterval(getInstagram, 9000);
  }

  $(document).ready(function() {
    getId();
    setHeight();
  });

  $(window).load(function() {
    getInstagram();
    getInstagram();
    setTimeInterval();
  });

  $(window).resize(function(){
    setWidth();
  });
})(jQuery);