$(document).ready(function() {
  // el logo aparecera y desaparecera en un intervalo de 1 segundo hasta que se muestre la siguiente vista
  setInterval(function() {
    $('#logo').fadeIn('slow').fadeOut('slow');
  }, 1000);
  clearInterval(5000);
  // la siguiente vista aparecera en 5 segundos
  setTimeout(function() {
    window.location.href = 'views/login.html';
  }, 5000);
});
