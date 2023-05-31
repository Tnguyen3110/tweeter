$(document).ready(function() {
  $('#tweet-text').on('keydown', function () {
    let length = this.value.length
    let remainingLength = 140 - length
  $('.counter').val(remainingLength)
  if (remainingLength < 0) {
    $('.counter').css('color', 'red')
  }
  })
});
