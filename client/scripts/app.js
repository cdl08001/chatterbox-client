$(document).ready(function() {
  // YOUR CODE HERE:
  var app = {
    'server': 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
  };

  app.init = function() {

  };

  app.send = function(message) {

    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

  };

  app.fetch = function() {

    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        _.each(data.results, function(item) {
          $('#chats').append(`<li class = 'msgs'>${item.text}</li>`);
        });
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve message', data);
      }
    });

  };

  app.clearMessages = function() {
    $('#chats').children().remove();
  };

  app.renderMessage = function(message) {
    $('#chats').append(`<li class = 'msgs'>${message.text}</li>`);
  };

  app.renderRoom = function(roomName) {
    $('#roomSelect').append(`<option>${roomName}</option>`);

  };

  $('#send').on('click', function() {
    var currentMessage = $('#message').val();
    console.log(currentMessage);
  });
  // $("#send").on('click', app.send(newMessage));

  // let newMessage = {
  //   username: window.location.search.split('=')[window.location.search.split('=').length -1],
  //   text: document.getElementById('message').value,
  //   roomname: $('#roomSelect').val,
  // };
});