var calcValues = {};
var todasParcelas = {
    creditas: 0,
    consig_pub: 0,
    consig_priv: 0,
    consig_inss: 0,
    cp: 0,
    credit_card_parc: 0,
    cheque: 0,
    credit_card_rot: 0,
};

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
};

function set_modal_values(values){
  $('#parcel-creditas').text(values['creditas']);
  $('#parcel-consig-pub').text(values['consig_pub']);
  $('#parcel-consig-inss').text(values['consig_inss']);
  $('#parcel-consig-priv').text(values['consig_priv']);
  $('#parcel-cp').text(values['cp']);
  $('#parcel-credit-card').text(values['credit_card_parc']);
  $('#parcel-cheque').text(values['cheque']);
  $('#parcel-credit-card-rot').text(values['credit_card_rot']);
};
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
    calcula(calcValues);
    calculaComparativo(calcValues);
    set_modal_values(todasParcelas);
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
        todasParcelas['creditas'] = parseFloat(monthly).toFixed(2);
    }
    else {
        alert("deu ruim");
        document.loandata.payment.value = "";
        document.loandata.total.value = "";
        document.loandata.totalinterest.value = "";
    }
}

function calculaComparativo(calcValues){
    var emprestimo = Number(calcValues['value'].replace(".", ""));
    var vAutomovel = calcValues['object_value'].replace(".", "");
    var parcela =  Number(calcValues['parcel']);    var vAutomovel = Number(vAutomovel);
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
                    todasParcelas['consig_pub'] = parseFloat(monthly).toFixed(2);
                    break;
                case 1:
                    todasParcelas['consig_inss'] = parseFloat(monthly).toFixed(2);
                    break;
                case 2:
                    todasParcelas['consig_priv'] = parseFloat(monthly).toFixed(2);
                    break;
                case 3:
                    todasParcelas['cp'] = parseFloat(monthly).toFixed(2);
                    break;
                case 4:
                    todasParcelas['credit_card_parc'] = parseFloat(monthly).toFixed(2);
                    break;
                case 5:
                    todasParcelas['cheque'] = parseFloat(monthly).toFixed(2);
                    break;
                case 6:
                    todasParcelas['credit_card_rot'] = parseFloat(monthly).toFixed(2);
                    break;
              }
        }

        else {
            //document.loandata.payment.value = "";
            //document.loandata.total.value = "";
            //document.loandata.totalinterest.value = "";
    }
  }
};
