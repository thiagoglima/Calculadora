function get_values(){
  var formGroup = $('.panel-heading');
  var guarantee = formGroup.find("#btn-group-guarantee .active input").val();
  var parcels = "";
  if (guarantee == "Casa") {
    parcels = formGroup.find("#btn-group-casa .active input").val();
  }else{
    parcels = formGroup.find("#btn-group-carro .active input").val();
  }
  var obj_value = $('#field-valor-objeto').val();
  var value = $('#field-valor-emprestimo').val();
  var calcDetails = {
    object: guarantee,
    parcel: parcels,
    object_value: obj_value,
    value: value
  };
  return calcDetails;
}

function set_modal_values(calcValues){
  $('#res-teste').text(JSON.stringify(calcValues));
}
var calcValues = {};

$(document).ready(function(){
  $("#field-valor-objeto").maskMoney();
  $("#field-valor-emprestimo").maskMoney();

  var btnCasa = $('#btn-group-casa');
  var btnCarro = $('#btn-group-carro');
  var labelValor = $('#label-valor-obj');

  $('#btn-casa').click(function(){
    btnCasa.show();
    btnCarro.hide();
    labelValor.html("Qual o valor estimado dessa casa?");
  });
  $('#btn-carro').click(function(){
    btnCasa.hide();
    btnCarro.show();
    labelValor.html("Qual o valor estimado desse carro?");
  });

  $('#btn-calc').click(function(){
    calcValues = get_values();
    set_modal_values(calcValues)
    calcula(calcValues)
  });
});

function calcula(calcValues){
    var emprestimo = document.loandata.emprestimo.value;
    var vAutomovel = document.loandata.vAutomovel.value;
    var parcela = document.loandata.parcela.value * 1;
    var juros;

    switch(parcela){
        case 12:
            juros = 0.0320;
            break;
        case 24:
            juros = 0.0307;
            break;
        case 36:
            juros = 0.0298;
            break;
        case 48:
            juros = 0.0280;
            break;
        default:
            alert("Selecione o número de parcelas");
    }


    var valorJuros = emprestimo * Math.pow(1 + juros, parcela);
    var totalEmprestimo =  Number(valorJuros) + Number(emprestimo);
    var monthly = (totalEmprestimo / parcela);

    if (!isNaN(monthly) &&
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {
        document.loandata.payment.value = monthly * 1000 ;
        document.loandata.total.value = (monthly * parcela) * 1000 ;
        document.loandata.totalinterest.value = valorJuros * 1000;
    }
    else {
        document.loandata.payment.value = "";
        document.loandata.total.value = "";
        document.loandata.totalinterest.value = "";
    }
    calculaComparativo();
}

function calculaComparativo(){
    var emprestimo = document.loandata.emprestimo.value;
    var vAutomovel = document.loandata.vAutomovel.value;
    var parcela = document.loandata.parcela.value * 1;
    var risco;
    var juros = new Array (0.0208, 0.0229, 0.0290, 0.0491, 0.0725, 0.1302, 0.1624);

    if(vAutomovel <= 10.000){
        risco = emprestimo * 0.1; //alto
    }
    else if(vAutomovel > 10.000 && vAutomovel < 40.000){
        risco = emprestimo * 0.075; //medio
    }
    else{
        risco = emprestimo * 0.045; //baixo risco.
    }
    var i;
    var valorJuros;
    var totalEmprestimo;
    var monthly;
    for(i = 0; i < 7; i++){
        valorJuros = (Number(emprestimo) + Number(risco)) * (Math.pow(1 + juros[i], parcela));
        //alert(valorJuros);
        totalEmprestimo =  Number(valorJuros) + Number(emprestimo);
        monthly = (totalEmprestimo / parcela);

        if (!isNaN(monthly) &&
            (monthly != Number.POSITIVE_INFINITY) &&
            (monthly != Number.NEGATIVE_INFINITY)) {
            switch(i){ //a cada iteração preenche um  dos tipos de credito comparativo (são 6 no total)
                case 0:
                    document.loandata.payment0.value = monthly * 1000 ;
                    document.loandata.total0.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest0.value = valorJuros * 1000;
                    break;
                case 1:
                    document.loandata.payment1.value = monthly * 1000 ;
                    document.loandata.total1.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest1.value = valorJuros * 1000;
                    break;
                case 2:
                    document.loandata.payment2.value = monthly * 1000 ;
                    document.loandata.total2.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest2.value = valorJuros * 1000;
                    break;
                case 3:
                    document.loandata.payment3.value = monthly * 1000 ;
                    document.loandata.total3.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest3.value = valorJuros * 1000;
                    break;
                case 4:
                    document.loandata.payment4.value = monthly * 1000 ;
                    document.loandata.total4.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest4.value = valorJuros * 1000;
                    break;
                case 5:
                    document.loandata.payment5.value = monthly * 1000 ;
                    document.loandata.total5.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest5.value = valorJuros * 1000;
                    break;
                case 6:
                    document.loandata.payment6.value = monthly * 1000 ;
                    document.loandata.total6.value = (monthly * parcela) * 1000 ;
                    document.loandata.totalinterest6.value = valorJuros * 1000;
                    break;
        }
        }

        else {
            //document.loandata.payment.value = "";
            //document.loandata.total.value = "";
            //document.loandata.totalinterest.value = "";
    }
}
}
