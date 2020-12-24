$(document).ready(function() {
  $('#navBtn').on('click', function(event) {
    $('#nav').toggleClass('hide');
    $('#langNav').addClass('hide');
  });

  $('#langBtn').on('click', function(event) {
    $('#langNav').toggleClass('hide');
    $('#nav').addClass('hide');
  });
})
