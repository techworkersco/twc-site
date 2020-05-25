$(document).ready(function() {
  $('#navBtn').on('click', function(event) {
    console.log('test?');
    $('#nav').toggleClass('hide');
    $('#langNav').addClass('hide');
  });

  $('#langBtn').on('click', function(event) {
    console.log('test 2?');
    $('#langNav').toggleClass('hide');
    $('#nav').addClass('hide');
  })
})

