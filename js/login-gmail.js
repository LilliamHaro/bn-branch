//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyA-_BSIvCCYkJH54HtQXqWRoUBbjb0vrQ8",
//     authDomain: "red-social-3dfa9.firebaseapp.com",
//     databaseURL: "https://red-social-3dfa9.firebaseio.com",
//     projectId: "red-social-3dfa9",
//     storageBucket: "red-social-3dfa9.appspot.com",
//     messagingSenderId: "605326029631"
//   };
//   firebase.initializeApp(config);
// // localhost
// var provider = new firebase.auth.GoogleAuthProvider();
// $('#login-gmail').click(function () {
//   firebase.auth()
//     .signInWithPopup(provider)
//     .then(function (result) {
//       console.log(result.user);
// //       saveDates(result.user);
// //       // save user information
// //       $('#saved').click(function (e) {
// //         e.preventDefault();
// //         var nameVal = $('#usrname').val();
// //         var procedVal = $('#psw').val();
// //         var interVal = $('#int').val();
// //         console.log(interVal);
// //         // replace dates user
// //         $('.text-title').html(function (buscayreemplaza, reemplaza) {
// //           return reemplaza.replace('NAME', '<strong>' + nameVal + '</strong>');
// //         });
// //         $('.text-proc').html(function (buscayreemplaza, reemplaza) {
// //           return reemplaza.replace('Procedencia', '<strong>' + procedVal + '</strong>');
// //         });
// //         $('.text-inter').append('<strong>' + interVal + '</strong>');
// //       })
// //     });
// // });

//   // save automathic database
//   // function saveDates(user) {
//   //   var usuario = {
//   //     uid: user.uid,
//   //     nombre: user.displayName,
//   //     foto: user.photoURL
//   //   }
//   //   firebase.database().ref('datesUser/' + user.uid)
//   //     .set(usuario)
//   // };

//   // save database firebase
//   // $('#saved').click(function () {
//   //   firebase.database().ref('datesUser')
//   //     .set({
//   //       nombre: 'Bliss',
//   //       edad: '15',
//   //       sexo: 'femenino'
//   //     });  // });


