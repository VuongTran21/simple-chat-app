$(function() {
    // make connection
    var socket = io.connect('http://localhost:3000');

    // button and input
    var message = $('#message');
    var username = $('#username');
    var sendMessage = $('#send_message');
    var sendUsername = $('#send_username');
    var chatroom = $('#chatroom');
    var feedback = $('#feedback');

    // emit change username
    sendUsername.click(function() {
        socket.emit('change_username', {username: username.val()});
    });

    // emit send new message
    sendMessage.click(function() {
        socket.emit('new_message', {message: message.val()});
    });

    // listen on new message
    socket.on('new_message', (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    });

    // emit typing
    message.bind("keypress", () => {
        socket.emit('typing');
    });

    // listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username +  " is typing a message ... </i></p>");
    });
})