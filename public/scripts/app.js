$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });



  const socket = io('http://localhost:8080');
  console.log(socket);

  socket.on('chat-message', data => {
    // console.log(data);
  });


  const messageContainer = $('#message-container');
  const messageForm = $('#send-container');
  const messageInput = $('#message-input');


  const name = window.user_id || 'admin';
  appendMessage('You joined');
  socket.emit('new-user', name);


  socket.on('chat-message', data => {
    appendMessage(`${ window.user_id || 'admin'}: ${ data.message }`);
  });

  socket.on('connect', data => {
    console.log('connected');
  });



  // socket.on('user-connected', name => {
  //   appendMessage(`${ name } connected`);
  // });

  // socket.on('user-disconnected', name => {
  //   appendMessage(`${ name } disconnected`);
  // });

  messageForm.on('submit', e => {
    e.preventDefault();
    const message = messageInput.val();

    appendMessage(`You: ${ message }`);
    socket.emit('send-chat-message', message);
    $("#message-input").val("");
  });


  // $('#faveButton').click(function(e) {
  //   e.preventDefault();
  // $.ajax({
  //     url: '/listings/',
  //     type: 'POST',
  //     data: {
  //       'submit': true
  //     }
  //   })
  //   .done((user_id) => {
  //     $(this).addClass('fave');
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //   });
  // }



  $(".faveButton").submit(function(event) {
    event.preventDefault();
    // debugger
    // console.log("good to go");
    $.post(`/favorites/${$(this).attr("action").split("/")[2]}`)
      .then(function(result) {
        // debugger
        // $(".faveButton").css("background-color", "red");
        // $(this).css("background-color", "red");
        $(event.target).children("button").css("background-color", "red");
        $(event.target).children("button").text("Added to Favourites")
        //css("color", "red");
        console.log('Success:', $(this).children("button").css);
      });
  });

  // eslint-disable-next-line func-style
  function appendMessage(message) {
    const messageElement = document.createElement('div');
    // const messageElement = $('<div/>');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }





  $(".tabs1").click(function() {
    $(this).removeClass("inactive");
    $(".tabs2").addClass("inactive");

    $(".tab1").removeClass("inactive");
    $(".tab2").addClass("inactive");
  });

  $(".tabs2").click(function() {
    $(this).removeClass("inactive");
    $(".tabs1").addClass("inactive");

    $(".tab2").removeClass("inactive");
    $(".tab1").addClass("inactive");
  });


  // $('.faveB').click(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //       url: '/listings/',
  //       type: 'POST',
  //       data: {
  //         'submit': true
  //       }
  //     })
  //     .done((user_id) => {
  //       $(this).toggleClass('fave');
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });

  // });

  // $("form").click(function() {
  //   $('#faveButton').css("color", "red");
  // });


  // $("#fave").click(function() {
  //   console.log('here');
  //   $(this).toggleClass("active");
  // });

});
