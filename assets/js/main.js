$(document).ready(function() {
  $('#navBtn').on('click', function(event) {
    $('#nav').toggleClass('hide');
    $('#langNav').addClass('hide');
    $('#chapterNav').addClass('hide');
  });

  $('#langBtn').on('click', function(event) {
    $('#langNav').toggleClass('hide');
    $('#nav').addClass('hide');
    $('#chapterNav').addClass('hide');
  });

  $('#chapterBtn').on('click', function(event) {
    $('#chapterNav').toggleClass('hide');
    $('#nav').addClass('hide');
    $('#langNav').addClass('hide');
  });
})

