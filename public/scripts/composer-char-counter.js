$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const length = this.value.length;
    const remainingLength = 140 - length;
    $('.counter').val(remainingLength);
    if (remainingLength < 0) {
      $('.counter').css('color', 'red');
    }
  });
});
