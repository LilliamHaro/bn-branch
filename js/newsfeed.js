
$('#go-to-profile').on('click', function(event) {
  window.location.href = '../views/profile.html';
});

$('#go-to-neewfeed').on('click', function(event) {
  window.location.href = '../views/newsfeed.html';
});

// dando funcionalidad al boton de sign out
$('#logout').on('click', function() {
  firebase.auth().signOut().then(function() {
    console.log('saliste');
    window.location.href = '../views/login.html';
  });
});
