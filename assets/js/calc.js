var btnCasa = $('#btn-group-casa');
var btnCarro = $('#btn-group-carro');
$('#btn-casa').click(function(){
  btnCasa.toggle();
  btnCarro.toggle();
});
$('#btn-carro').click(function(){
  btnCasa.toggle();
  btnCarro.toggle();
});
