
$('#go-to-profile').on('click', function(event) {
  window.location.href = '../views/profile.html';
});

$('#go-to-neewfeed').on('click', function(event) {
  window.location.href = '../views/newsfeed.html';
});

$(document).ready(function() {
  // Inicializando firebase
  var config = {
    apiKey: 'AIzaSyDHyANUi8mFqBD0mU-3G7-OGCVYPdZokRo',
    authDomain: 'red-social-x.firebaseapp.com',
    databaseURL: 'https://red-social-x.firebaseio.com',
    projectId: 'red-social-x',
    storageBucket: 'red-social-x.appspot.com',
    messagingSenderId: '795353793299'
  };
  firebase.initializeApp(config);
  //
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // var arr = [];
      // var firebaseUsers = firebase.database().ref().child('users')
      // firebaseUsers.on('child_added', function(datasnapshot) {
      //   var allUsers = datasnapshot.child('name').val();
      //   if (allUsers !== null && datasnapshot.child('email').val() !== user.email) {
      //     var postRuta = datasnapshot.child('post').val();
      //     console.log(postRuta);
      //     // document.getElementById('feed').appendChild(postRuta);
      //   }
      // });
      var firebaseUsers = firebase.database().ref().child('users');
      firebaseUsers.on('child_added', function(datasnapshot) {
        var allUsers = datasnapshot.child('name').val();
        var allUsersemail = datasnapshot.child('email').val();
        if (allUsers !== null && datasnapshot.child('email').val() !== user.email) {
          // obteniendo codigo unico de cada usuario
          var allUsersCode = datasnapshot.ref.key;
          $('#feed').append('<p class=" col-md-offset-1 col-md-10 col-xs-offset-1 col-xs-10 pd-15 bord " >' + allUsers + '<br>' + allUsersemail + '<span data-code="' + allUsersCode + '" class="btn-seguir float-rigth">Seguir</span></p>');
          // $('#usuario').append('<div class="posts">' + allUsers + '</div>');

          $('#feed span').on('click', function(event) {
            var anotherUserPlace = $(this).data('code');
            // alert(anotherUserPlace);
            window.localStorage.setItem('another-user-code', anotherUserPlace);
            window.location.href = '../views/another-user-profile.html';
          });
        }
      });
    } else {

    }
  });
});
// dando funcionalidad al boton de sign out
$('#logout').on('click', function() {
  firebase.auth().signOut().then(function() {
    console.log('saliste');
    window.location.href = '../views/login.html';
  });
});
