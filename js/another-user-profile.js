var config = {
  apiKey: 'AIzaSyDHyANUi8mFqBD0mU-3G7-OGCVYPdZokRo',
  authDomain: 'red-social-x.firebaseapp.com',
  databaseURL: 'https://red-social-x.firebaseio.com',
  projectId: 'red-social-x',
  storageBucket: 'red-social-x.appspot.com',
  messagingSenderId: '795353793299'
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var anotherUserCode = window.localStorage.getItem('another-user-code');
    console.log(anotherUserCode);
    var firebaseAnotherUsers = firebase.database().ref('users').child(anotherUserCode);
    firebaseAnotherUsers.on('value', function(datasnapshot) {
      var nameAnotherUSer = datasnapshot.child('name').val();
      var EmailAnotherUser = datasnapshot.child('email').val();
      var DescriptionAnotherUser = datasnapshot.child('description').val();
      // console.log(nameAnotherUSer);
      $('#another-user-name').text(nameAnotherUSer);
      $('#another-user-email').text(EmailAnotherUser);
      $('#another-user-description').text(DescriptionAnotherUser);
      showIconImage();
      function showIconImage() {
        var iconImageRef = firebase.database().ref('users').child(anotherUserCode).child('iconImage').child('urlImage');
        iconImageRef.on('value', function(datasnapshot) {
          // esto devuelve un array por eso se puede recorrer
          var myIcon = datasnapshot.val();
          if (myIcon !== null) {
            $('#anotherUserIcon img').replaceWith('<img src="' + myIcon + '">');
          }
        });
      }
    });
    var firebaseAnotherUsersPost = firebase.database().ref('users').child(anotherUserCode).child('post');
    firebaseAnotherUsersPost.on('child_added', function(datasnapshot) {
      var postsAnotherUsers = datasnapshot.val();
      var imagenPublicada = datasnapshot.child('url').val();
      if (imagenPublicada) {
        var imagenPostPublicado = datasnapshot.child('url').val();
        $('#another-user-post').prepend('<div class="posts "><img class="" src="' + imagenPostPublicado + '"></div>');
      } else {
        $('#another-user-post').prepend('<div class="posts">' + postsAnotherUsers + '</div>');
      }
    });

    var firebaseUsers = firebase.database().ref().child('users');
    firebaseUsers.on('child_added', function(datasnapshot) {
      var allUsers = datasnapshot.child('name').val();
      // obteniendo codigo unico de cada usuario
      var allUsersCode = datasnapshot.ref.key;
      $('#usuarios').append('<button class="another-user width-100" data-code="' + allUsersCode + '">' + allUsers + '</button>');
      // $('#usuario').append('<div class="posts">' + allUsers + '</div>');

      $('#usuarios button').on('click', function(event) {
        var anotherUserPlace = $(this).data('code');
        // alert(anotherUserPlace);
        window.localStorage.setItem('another-user-code', anotherUserPlace);
        window.location.href = '../views/another-user-profile.html';
      });
    });
  } else {

  }
});

$('#go-to-profile').on('click', function(event) {
  window.location.href = '../views/profile.html';
});

$('#go-to-neewfeed').on('click', function(event) {
  window.location.href = '../views/newsfeed.html';
});

$('#logout').on('click', function() {
  firebase.auth().signOut().then(function() {
    console.log('saliste');
    window.location.href = '../views/login.html';
  });
});
