/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  // 


  const createTweetElement = function(tweet) {

    const $tweet = `
    <article class="tweets">
          <header>
            <span>
              <img src=${tweet.user.avatars}
                alt="avatar" class="avatar">${tweet.user.name}
            </span>
            <h3>${tweet.user.handle}</h3>
          </header>
          <section class="tweet-content">
            <p class="tweet-text">
              ${tweet.content.text}
            </p>
          </section>
          <footer>
            <p> ${timeago.format(tweet.created_at)} </p>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `;

    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


  // Add event listener for submit
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the tweet area value
    let tweetText = $('#tweet-text').val().trim();

    // Check if tweet area is empty or exceeds the character limit
    if (tweetText === "") {
      $('#error-message').text("Please enter a tweet.").slideDown();
      return;
    }

    if (tweetText.length > 140) {
      $('#error-message').text("Tweet must not exceed 140 characters.").slideDown();
      return;
    }




    // Get form data
    let formData = $(this).serialize();

    //Make an AJAX request
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: formData
    })
      .then(function(response) {
        console.log(response);
        // Handle the success responsed

        // Clear the tweet area
        $('#tweet-text').val('');


        loadTweets();


      })
      .catch(function(xhr) {
        console.log(xhr.responseText);
        // Handle the error response
      });
  });

  // Function to load tweets
  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
      .then(function(response) {

        renderTweets(response);
        // Handle the success response and process the tweets
      })
      .catch(function(xhr, status, error) {
        console.log('Error:', error);
        // Handle the error response
      });
  }

  // Call the loadTweets function
  loadTweets();



});

