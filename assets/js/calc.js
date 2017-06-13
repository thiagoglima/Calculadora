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
    set_modal_values(calcValues);
    calcula(calcValues);
  });
});

function calcula(calcValues){
   var emprestimo = calcValues['value'].replace(".", "");
   var vAutomovel = calcValues['object_value'].replace(".", "");
  // emprestimo = emprestimo.replace(",", "");
   // emprestimo = emprestimo.Remove(nome.Length - 2);
   // emprestimo = emprestimo;
    //emprestimo = emprestimo.substr(1,(string.length - 1));
   // var vAutomovel = calcValues['object_value'].replace(".", "");
   // vAutomovel = vAutomovel.replace(".","");
    

   // var emprestimo = Number(calcValues['value']);
    
    emprestimo = Number(emprestimo);
    var parcela =  Number(calcValues['parcel']);
    var vAutomovel = Number(vAutomovel);
    var juros;

    alert(typeof vAutomovel);
    alert(vAutomovel);
    alert(emprestimo);

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
        case 120:
            juros = 0.0491;
            break;
        case 180:
            juros = 0.0491;
            break;
        case 240: 
            juros = 0.0491;
            break;   
        default:
            alert("Selecione o número de parcelas");
    }


    var valorJuros = emprestimo * Math.pow(1 + juros, parcela);
    var totalEmprestimo =  valorJuros + emprestimo;
    var monthly = (totalEmprestimo / parcela);

    if (!isNaN(monthly) &&
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {
        alert(monthly);
        alert((monthly * parcela));
        alert(valorJuros);
    }
    else {
        alert("deu ruim")
        document.loandata.payment.value = "";
        document.loandata.total.value = "";
        document.loandata.totalinterest.value = "";
    }
    calculaComparativo(calcValues);
}

function calculaComparativo(calcValues){
    var emprestimo = Number(calcValues['value']);
    var parcela =  Number(calcValues['parcel']);
    var vAutomovel = Number(calcValues['object_value']);
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
                case 0: //preenche valor parcela para Crédito consignado - público
                    alert( monthly);
                    alert((monthly * parcela));
                    alert(valorJuros);
                    break;
                case 1:
                    //preenche valor parcela para crédito consignado - inss
                    alert( monthly);
                    alert((monthly * parcela));
                    alert(valorJuros);
                    break;
                case 2:
                    //preenche valor parcela para crédito consignado - privado
                    break;
                case 3:
                    //preenche valor parcela para crédito pessoal
                    break;
                case 4:
                    //preenche valor parcela para cartão de crédito - parcelado
                    break;
                case 5:
                    //preenche valor parcela para cheque especial
                    break;
                case 6:
                    //preenche valor parcela para cartão de crédito rotativo
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
