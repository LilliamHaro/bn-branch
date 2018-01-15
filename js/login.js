
// deshabilitando y ocultando botones y secciones antes de que cargue completamente la página
$('#login-text').hide();
$('#div-name').hide();
$('#signup-button').hide();
$('#signup-button').prop('disabled', true);
$('#login-button').prop('disabled', true);


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
  var opEmail = false;
  var opPassword = false;

  // funcion para activar los botones sign up y log in
  function activeFinalButton() {
    if (opEmail === true && opPassword === true) {
      $('#login-button').attr('disabled', false);
      $('#signup-button').attr('disabled', false);
      $('#login-button').addClass('enabled-button');
      $('#signup-button').addClass('enabled-button');

      // $('#login-button').addClass('bg-magenta');
    } else {
      $('#login-button').attr('disabled', true);
      $('#signup-button').attr('disabled', true);
      $('#login-button').removeClass('enabled-button');
      $('#signup-button').removeClass('enabled-button');
      // $('#login-button').removeClass('bg-magenta');
    }
  }

  // validando email
  $('#inputEmail').on('input', function(event) {
    var EMAILESTRUC = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    if (EMAILESTRUC.test($(this).val())) {
      opEmail = true;
    } else {
      opEmail = false;
    }
    activeFinalButton();
  });

  // validando password
  $('#inputPassword').on('input', function(event) {
    if ($(this).val().length >= 6) {
      opPassword = true;
    } else {
      opPassword = false;
    }
    activeFinalButton();
  });

  $('#signup-enter').on('click', function() {
    $('#login-button').hide();
    $('#signup-text').hide();
    $('#signup-button').show();
    $('#login-text').show();
    $('#div-name').show();
  });

  $('#login-enter').on('click', function() {
    $('#login-button').show();
    $('#signup-text').show();
    $('#signup-button').hide();
    $('#login-text').hide();
    $('#div-name').hide();
  });

  // registrando un usuario nuevo en la base de datos
  $('#signup-button').on('click', function(event) {
    var emailText = $('#inputEmail').val();
    var passwordText = $('#inputPassword').val();
    firebase.auth().createUserWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#inputPassword').val('');
        alert(errorMessage);
      }
    });
  });

  // logeando un usuario
  $('#login-button').on('click', function(event) {
    // event.preventDefault();
    var emailText = $('#inputEmail').val();
    var passwordText = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#inputPassword').val('');
        alert(errorMessage);
      }
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      // var name = $('#inputName').val();
      // localStorage.setItem('userName', name);
      window.location.href = '../views/profile.html';
    } else {
      console.log('usuario no logeado');
    }
  });
});
