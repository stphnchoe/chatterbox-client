var app = {};// YOUR CODE HERE:

app.init = function() {};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: this.message,
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

app.fetch = function(roomName) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: this.message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].roomname === roomName) {
          app.renderMessage(data.results[i]);
        }
        //app.renderMessage(data.results[i]);
      }

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(message) {
  $('#chats').append('<p>' + message.text + '</p>');
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<p>' + roomName + '</p>');
};

app.handleUsernameClick = function() {
  $('.put').click(function() {
    return true;
  });
};



$(document).ready(function() {
  $('.submitForm').submit(function() {
   // alert($('.input').val());
    var message = {};
    message.text = $('.input').val();
    app.fetch();

  });

  $('a[href$="#testing"]').on('click', function() {
    app.clearMessages();
    setTimeout(app.fetch('testing'), 200);
    
  });

  $('a[href$="#testroom"]').on('click', function() {
    app.clearMessages();
    setTimeout(app.fetch('testRoom', 200));
  });

  $('a[href$="#lobby"]').on('click', function() {
    app.clearMessages();
    setTimeout(app.fetch('lobby'), 200);
  });
});