// $('#newName').hide();
$('#section-change-name').hide();
$('#section-change-description').hide();
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      var userCode = user.uid;
      $('#user-email-desktop').text(email);
      // creando el apartado del usuario
      var firebasePostREsfName = firebase.database().ref('users').child(userCode);
      firebasePostREsfName.on('value', function(datasnapshot) {
        var updatingName = datasnapshot.child('name').val();
        if (updatingName) {
          $('#user-name').text(updatingName);
        }
        var updatingDescription = datasnapshot.child('description').val();
        if (updatingDescription) {
          $('#user-description').text(updatingDescription);
        }
      });
      var firebasePostREsf = firebase.database().ref('users').child(userCode).child('email');
      firebasePostREsf.set(email);
      console.log(userCode);

      // mostrando input para cambiar el nombre
      $('#show-change-name').on('click', function(event) {
        $('#section-change-name').show();
        $('#show-change-name').hide();
      });
      // actualizando nombre de usuario en la base de datos
      $('#user-name-button').on('click', function(event) {
        // validando que el input no este vacio ni con solo espacios
        if ($('#newName').val() && $('#newName').val() != 0) {
          var newName = $('#newName').val();
          var firebasePostREsf = firebase.database().ref('users').child(userCode).child('name');
          firebasePostREsf.set(newName);
        }
        $('#section-change-name').hide();
        $('#show-change-name').show();
        $('#newName').val('');
      });

      $('#show-change-description').on('click', function(event) {
        $('#section-change-description').show();
        $('#show-change-description').hide();
      });
      $('#user-description-button').on('click', function(event) {
        if ($('#newDescription').val() && $('#newDescription').val() != 0) {
          var newDescription = $('#newDescription').val();
          var firebasePostREsfDesc = firebase.database().ref('users').child(userCode).child('description');
          firebasePostREsfDesc.set(newDescription);
        }
        $('#section-change-description').hide();
        $('#show-change-description').show();
        $('#newName').val('');
      });

      // guardando nuevos post
      $('#button-post').on('click', function(event) {
        if ($('#input-post').val() && $('#input-post').val() != 0) {
          var fecha = new Date();
          var hora = fecha.getHours();
          var minuto = fecha.getMinutes();
          // condicionales para evitar que las horas y los minutos no aparezcan como unidades
          if (minuto < 10) {
            minuto = '0' + minuto;
          }
          if (hora < 10) {
            hora = '0' + hora;
          }
          var hours = 'Publicado a las ' + hora + ':' + minuto + ' horas';
          var newPost = $('#input-post').val() + '<br>' + hours + ' por ' + user.email;
          var firebaseRef = firebase.database().ref('users').child(userCode);
          firebaseRef.child('post').push(newPost);
          $('#input-post').val('');
        }
      });

      // mostrando los post guardados
      var firebasePostREsf = firebase.database().ref('users').child(userCode).child('post');
      firebasePostREsf.on('child_added', function(datasnapshot) {
        var postPublicado = datasnapshot.val();
        var imagePublicada = datasnapshot.child('url').val();
        var dateImage = datasnapshot.child('date').val();
        if (imagePublicada) {
          var imagePostPublicado = datasnapshot.child('url').val();
          $('#publicado').prepend('<div class="posts"><img class="" src="' + imagePostPublicado + '"><p>' + dateImage + '</p></div>');
        } else {
          $('#publicado').prepend('<div class="posts">' + postPublicado + '</div>');
        }
      });


      // GUARDANDO IMAGENES
      // referencia al storage de firebase
      var storageRef = firebase.storage().ref();
      showIconImage();
      $('#fichero').on('change', uploadImage);
      function uploadImage() {
        var photoImageToUpload = $('#fichero').prop('files')[0];
        var uploadTask = storageRef.child('imagenes/' + photoImageToUpload.name).put(photoImageToUpload);
        uploadTask.on('state_changed', function(snapshot) {
          // mostrar barra de progreso
        },
        function(error) {
          alert('Hubo un error al subir la imagen');
        },
        function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          createImageFirebaseNode(photoImageToUpload.name, downloadURL);
        });
      };
      function createImageFirebaseNode(ImageName, url) {
        var iconImageRef = firebase.database().ref('users').child(userCode).child('iconImage');
        iconImageRef.child('urlImage').set(url);
        iconImageRef.child('nameImage').set(ImageName);
      }
      function showIconImage() {
        var iconImageRef = firebase.database().ref('users').child(userCode).child('iconImage').child('urlImage');
        iconImageRef.on('value', function(datasnapshot) {
          // esto devuelve un array por eso se puede recorrer
          var myIcon = datasnapshot.val();
          if (myIcon !== null) {
            $('#icon-div img').replaceWith('<img src="' + myIcon + '">');
          }
        });
      }
      // recomendando usuarios
      var firebaseUsers = firebase.database().ref().child('users');
      firebaseUsers.on('child_added', function(datasnapshot) {
        var allUsers = datasnapshot.child('name').val();
        if (allUsers !== null && datasnapshot.child('email').val() !== user.email) {
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
        }
      });

      // posteando IMAGENES
      $('#image-post').on('change', savingPostImage);
      var storageRef = firebase.storage().ref();
      function savingPostImage() {
        var postPhotoImageToUpload = $('#image-post').prop('files')[0];
        var uploadTaskImagePost = storageRef.child('imagenes/' + postPhotoImageToUpload.name).put(postPhotoImageToUpload);
        uploadTaskImagePost.on('state_changed', function(snapshot) {
          // mostrar barra de progreso
        },
        function(error) {
          alert('Hubo un error al subir la imagen');
        },
        function() {
          var downloadURL = uploadTaskImagePost.snapshot.downloadURL;
          createImagePostFirebaseNode(postPhotoImageToUpload.name, downloadURL);
        });
      };

      function createImagePostFirebaseNode(imageName, url) {
        var fecha = new Date();
        var hora = fecha.getHours();
        var minuto = fecha.getMinutes();
        // condicionales para evitar que las horas y los minutos no aparezcan como unidades
        if (minuto < 10) {
          minuto = '0' + minuto;
        }
        if (hora < 10) {
          hora = '0' + hora;
        }
        var hours = 'Publicado a las ' + hora + ':' + minuto + ' horas';
        var imagePostRef = firebase.database().ref('users').child(userCode);
        // alert(imagePostRef);
        imagePostRef.child('post').push({
          imageNamePost: imageName,
          url: url,
          date: '<br>' + hours + ' por ' + user.email});
      }

      // api de NT Times

      // obteniendo elementos del dom
      const btnNY = document.getElementById('search-btn');
      const searchField = document.getElementById('search-keyword');
      const nyNews = document.getElementById('ny-news');
      let searchedForText;

      btnNY.addEventListener('click', function(event) {
        // preventDefault para el evento submit
        event.preventDefault();
        // vaciando el contenedor de articulos por cada nueva busqueda
        nyNews.innerHTML = '';
        searchedForText = searchField.value;
        getNews();
      });

      function getNews() {
        // instanciando el objeto XMLHttpRequest para el funcionamiento de ajax
        const articleRequest = new XMLHttpRequest();
        // haciendo el pedido de información -no olvidar las comilla para el concatendado de em6-
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=117c28a425a1454c87487ddf839178f7`);
        // funciones
        articleRequest.onload = addNews;
        articleRequest.onerror = handleError;
        articleRequest.send();
      }
      // funcion para manejar los errores
      function handleError() {
        console.log('se ha presentado un error');
      }

      function addNews() {
        // parseando a json para acceder a su propiedades
        const data = JSON.parse(this.responseText);
        const response = data.response.docs;
        // recooriendo todos los articulo
        response.forEach(function(article) {
          // obteniendo propiedades
          const snippet = article.snippet;
          const urlArt = article.web_url;
          const headMain = article.headline.main;
          // manipulando el dom para mostrar la informacion ordenadamente
          let div = document.createElement('div');
          let li = document.createElement('li');
          let a = document.createElement('a');
          let h4 = document.createElement('h4');
          h4.innerText = headMain;
          li.innerText = snippet;
          a.innerText = '(Ir al artículo)';
          a.setAttribute('href', urlArt);
          a.setAttribute('target', '_blank');
          li.appendChild(a);
          div.appendChild(h4);
          div.appendChild(li);
          nyNews.appendChild(div);
          console.log(article);
        });
      }

      // -------------------------
      console.log(email);
    } else {
      // No user is signed in.
    }
  });

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
});
