// $('#newName').hide();
$('#section-change-name').hide();
$(document).ready(function() {
  // Inicializando firebase
  var config = {
    apiKey: 'AIzaSyDHyANUi8mFqBD0mU-3G7-OGCVYPdZokRo',
    authDomain: 'red-social-x.firebaseapp.com',
    databaseURL: 'https://red-social-x.firebaseio.com',
    projectId: 'red-social-x',
    storageBucket: '',
    messagingSenderId: '795353793299'
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      var userCode = user.uid;
      // cambio
      $('#nombre').text(email);
      $('#user-email-desktop').text(email);
      // cambio
      console.log(userCode);
      // referencia al apartado del usuario con sus post
      var firebasePostREsf = firebase.database().ref('users').child(userCode).child('post');
      firebasePostREsf.on('child_added', function(datasnapshot) {
        var postPublicado = datasnapshot.val();
        $('#publicado').prepend('<div class="posts">' + postPublicado + '</div>');
      });

      $('#show-change-name').on('click', function(event) {
        $('#section-change-name').show();
        $('#show-change-name').hide();
      });
      $('#user-name').on('click', function(event) {
        // $('#newName').show();
        var userName = $('#newName').val();
        $('#my-name').text(userName);
        $('#username-android').text(userName);
        var firebaseUserREsf = firebase.database().ref('users').child(userCode);
        firebaseUserREsf.child('name').set(userName);
        $('#section-change-name').hide();
        $('#show-change-name').show();
      });

      // $('#my-icon').on('change', function(event) {
      //   var firebaseUserREsf = firebase.database().ref('users').child(userCode);
      //   var archivo = new FileReader();
      //   firebaseUserREsf.child('icon').push({
      //     urlLarge: event.target.result,
      //     url: ImagenPequeña
      //   });
      //   $('#icon').attr('src', ImagenPequeña)
      // });

      $('#button-post').on('click', function(event) {
        var newPost = $('#input-post').val();
        // referencia a la base de datos en tiempo real
        var firebaseRef = firebase.database().ref('users').child(userCode);
        // creando un nodo hijo y agregandole los nuevos post
        // push le da un identificador unico a lo que agrega
        firebaseRef.child('post').push(newPost);
        $('#input-post').val('');
      });

      /* Cambie el método on, por el método one que hace que solo se produzca una vez el evento click. Recuerda que el método on se utiiza cuando quieres que un evento se produzca varias veces */
      $('#follow').one('click', function() {
        var firebaseUsers = firebase.database().ref().child('users');
        firebaseUsers.on('child_added', function(datasnapshot) {
          var allUsers = datasnapshot.child('name').val();
          // obteniendo codigo unico de cada usuario
          var allUsersCode = datasnapshot.ref.key;
          $('#usuarios').append('<button class="another-user" data-code="' + allUsersCode + '">' + allUsers + '</button>');
          // $('#usuario').append('<div class="posts">' + allUsers + '</div>');
        });
      });

      $('#usuarios button').on('click', function(event) {
        var anotherUserPlace = $(this).data('code');
        alert('anotherUserPlace');
        // var firebaseAnotherUsers = firebase.database().ref('users').child(anotherUserPlace).child('name');
        // firebaseAnotherUsers.on('value', function(datasnapshot) {
        //   var anotherUserName = datasnapshot.val();
        //   console.log(anotherUserName);
        // });
      });

      console.log(email);
    } else {
      // No user is signed in.
    }
  });

  // dando funcionalidad al boton de sign out
  $('#logout').on('click', function() {
    firebase.auth().signOut().then(function() {
      console.log('saliste');
      window.location.href = '../views/login.html';
    });
  });
});
