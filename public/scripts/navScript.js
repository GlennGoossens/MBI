jQuery(document).ready(function($){
    var path = window.location.pathname.split("/")[1];
    console.log(path);
    var target = $('div a[href="/'+path+'"]');
    // Add active class to target link
    target.addClass('active');
  });