var firebaseUsers = firebase.database().ref().child('users');
firebaseUsers.on('child_added', function(datasnapshot) {
  var allUsers = datasnapshot.child('name').val();
  // obteniendo codigo unico de cada usuario
  var allUsersCode = datasnapshot.ref.key;
  $('#usuarios').append('<button class="another-user" data-code="' + allUsersCode + '">' + allUsers + '</button>');
  // $('#usuario').append('<div class="posts">' + allUsers + '</div>');

  $('#usuarios button').on('click', function(event) {
    var anotherUserPlace = $(this).data('code');
    alert(anotherUserPlace);
    var firebaseAnotherUsers = firebase.database().ref('users').child(anotherUserPlace);
    firebaseAnotherUsers.on('value', function(datasnapshot) {
      var nameAnotherUSer = datasnapshot.child('name').value;
      // var postAnotherUser = datasnapshot.child('post');
    });
    var firebaseAnotherUsersPost = firebase.database().ref('users').child(anotherUserPlace).child('post');
    firebaseAnotherUsersPost.on('child_added', function(datasnapshot) {
      var postsAnotherUsers = datasnapshot.val();
      $('#otrosUsuariosPost').append('<div class="another-user">' + postsAnotherUsers + '</div>');
    });
    // console.log(postAnotherUser);
    // window.location.href = '../views/login.html';
  });
});
