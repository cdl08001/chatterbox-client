var app = {
  'server': 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  'friendsList': [],
  'rooms': ['Home']
};

$(document).ready(function(){
// YOUR CODE HERE:

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
  // item.username
  // item.text
  // item.createdAt
  // item.roomname
  // item.updatesAt
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        _.each(data.results, function(item) {
          if(item.text.includes('<script>') || item.text.includes('<') || item.text.includes('<img>') || item.username.includes('<script>') || ((item.roomname !== null || item.roomname !== undefined) && item.roomname.includes('<script>'))){
            delete item;
          } else {
            var fetchUser = item.username;
            var fetchMessage = item.text;
            $('#chats').append(
              `<div class = 'msgs'><div display = 'block' class = 'toBeFriend ${item.roomname}' value = '${fetchUser}'>${fetchUser} </div>${fetchMessage}</div>`);
          }
          if(!app.rooms.includes(item.roomname)){
            app.rooms.push(item.roomname);
            app.renderRoom(item.roomname);
          } 
        });
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve message', data);
      }
    });

  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.renderMessage = function(message) {
    $('#chats').append(`<li class='msgs'>${message.text}</li>`);
  };

  app.renderRoom = function(roomName) {
    $('#roomSelect').append(`<option value="${roomName}">${roomName}</option>`);
    
  };

  $('#send').on('click', function() {
    var currentMessage = $('#message').val();
    var currentRoom = $('#roomSelect').val();
    var currentUser = window.location.search.split('=')[window.location.search.split('=').length -1];
    console.log(currentRoom, currentMessage, currentUser);
    let newMessage = {
      username: currentUser,
      text: currentMessage,
      roomname: currentRoom
    };
    app.send(newMessage);
    app.fetch();
  });
  
  $('#clear').on('click', function() {
    app.clearMessages();
  });
  
  $('#roomSelect').on('change', function(){
    var selectedRoom = $(this).val();
    $('#chats .msgs').each(function(message){
      $(this).toggle(true);
      if(!$(this).children().hasClass(selectedRoom)){
        console.log(this);
        $(this).toggle();
      }
    })
  });
  
  app.handleSubmit = function(){
    // Last test needs this function
  };
  
  
  
  $(document).on('click', '.toBeFriend', function(){
    console.log('CLICKED!!');
  });
  
});
