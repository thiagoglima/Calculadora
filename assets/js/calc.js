
function get_values() {
  var optObjeto = $('');
  var optParcelas = $('');
  var valorObj = $('');
  var valorEmprestimo = $('');
}

$(document).ready(function(){
  var btnCasa = $('#btn-group-casa');
  var btnCarro = $('#btn-group-carro');
  var labelValor = $('#label-valor-obj');

  $('#btn-casa').click(function(){
    btnCasa.show();
    btnCarro.hide();
    labelValor.html("Qual o valor estimado dessa casa?")
  });
  $('#btn-carro').click(function(){
    btnCasa.hide();
    btnCarro.show();
    labelValor.html("Qual o valor estimado desse carro?")
  });
});
