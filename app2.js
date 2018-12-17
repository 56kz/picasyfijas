

$(function(){
  // Generar 4 digitos random
  var numbers = [0,1,2,3,4,5,6,7,8,9];
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    };
    return array;
  };
  const secret_number = shuffleArray(numbers).slice(0,4).join('');
  console.log(secret_number);
  //comenzar validaciones
  $('#new-number').keyup(function(e){
   const new_number = $(this).val();
   const array = new_number.split('');
   const marray = array.sort();

    if (e.which === 13){
      if  ( (new_number.length != 4) || (marray[0] === marray[1] || marray[1] === marray[2] || marray[2] === marray[3] || marray[3] === marray[4])  ){
        $('.error').css("color", "red");
      } else {
        //Terminan validaciones
        $('.error').css("color", "white");
        $(this).val('');
        //si el usuario adivina el numero
        if ( secret_number.toString() === new_number.toString() ) {
          $('.main').hide();
          $('.winner').show();
          $('#new-game').on('click', function(){
            location.reload();
          });
        } else {
          //si el usuario no gana hay q hallar las picas, fijas y colocarlo en la tabla
          var fijas = 0;
          var picas = 0;
          for (var i = 0; i < new_number.length; i++) {
            if (new_number[i] === secret_number[i]) {
              fijas += 1;
            };
            if (secret_number.includes(new_number[i])) {
              picas += 1;
            };
          };
          // y agregar uuna casilla en la tablacon los valores almacenados
          $('tbody').prepend('<tr><td>' + new_number + '<td>' + picas + '<td>' + fijas);
        };
      };
    };
  });
});
