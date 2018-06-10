//url base dos servicos da aplicacao
const BASE_URL_SERVICO = 'http://localhost:3002/portal_patrimar';

//quando a pagina ja está carregada
$(document).ready(function(){
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
          }
      };
      
      $('.sp_celphones').mask(SPMaskBehavior, spOptions);
    //define as mascaras dos campos
    $(".data").mask("99/99/9999");
    $(".valor").maskMoney({showSymbol:true, symbol:"R$ ", decimal:",", thousands:"."});
    $(".percentual").maskMoney({showSymbol:true, symbol:"% ", decimal:",", thousands:"."});
    $('.date').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.cep').mask('00000-000');
    $('.rg').mask('00-000.000');
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00');
    $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
        'Z': {
            pattern: /[0-9]/, optional: true
        }
        }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', {reverse: true});
    $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
    $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
    $('.fallback').mask("00r00r0000", {
        translation: {
            'r': {
            pattern: /[\/]/,
            fallback: '/'
            },
            placeholder: "__/__/____"
        }
        });
    $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
});

//Ação do botao buscar
$("#txtBuscar").keyup(function(){
    var tabela = $("#lista_registros");
    if($('#txtBuscar').val() != '') {
        $("#lista_registros tbody>tr").hide();
        $("#lista_registros td:contains-ci('" + $('#txtBuscar').val() + "')").parent("tr").show();
    } else {
        $("#lista_registros  tbody>tr").show();
    }
});

//acao de pesquisa dentro da table
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

//funcao para formatar o valor
function formatValor(n, currency) {
    var aux = '';
    if(n !== null)
        aux = currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\,)/g, "$ 1,").replace(".", ",");
    else 
        aux = currency + ' 0,00';
    return aux;
};

//funcao para remover mascara
function removeMascara(texto, mascara){
    if(texto !== ''){
        var dado = texto.replace(mascara, "").replace(".","").replace(",",".");
        return dado;
    }
    else
        return 0;
};

//funcao para formatar data
function formataData(data){
    if (data !== ''){
        var dia = data.substr(0,2);
        var mes = data.substr(3,2);
        var ano = data.substr(6,4);
        return ano + '-' + mes + '-' + dia;
    }
    else 
        return null;
};

//funcao para remover mascara cpfcnpj
function removeMascaraCPFCNPJ(texto){
    let aux = "";
    aux = texto.replace(/\./g,"").replace(/\-/g,"").replace("/","");
    return aux;
};

//funcao para remover mascara telefone
function removeMascaraTelefone(texto){
    let aux = "";
    aux = texto.replace(/\(/g,"").replace(/\)/g,"").replace(/\-/g,"").replace(" ","");
    return aux;
};

//funcao para remover mascara cep
function removeMascaraCep(texto){
    let aux = "";
    aux = texto.replace(/\./g,"").replace(/\-/g,"");
    return aux;
};

//funcao para remover mascara percentual
function removeMascaraPercentual(texto){
    let aux = "";
    aux = texto.replace(/\,/g,".").replace(/\%/g,"");
    return aux;
};

//funcao para remover mascara valor
function removeMascaraValor(texto){
    let aux = "";
    aux = texto.replace(/\./g,"").replace(/\,/g,".").replace(/\R$/g,"");
    return aux;
};

//funcao para calcular idade
function calculaIdade(data){
    let diferenca;
    if(data != undefined){
        let hoje = new Date;
        let ano = data.substr(0,4);
        diferenca = hoje.getFullYear() - parseInt(ano);
    }
    else 
        diferenca = 0;
    return diferenca;
};

//formata data para o formato brasileiro
function formataDataBrasileira(data){
    if ((data !== '') && (data != null)){
        let dia = data.substr(8,2);
        let mes = data.substr(5,2);
        let ano = data.substr(0,4);
        return dia + '/' + mes + '/' + ano;
    } 
    else
        return '';
};

//funcao para formatar o cep
function formataCep(cep){
    if ((cep != '') && (cep != null)){
        let primeiraParte = cep.substr(0,5);
        let segundaParte = cep.substr(5,3);
        return primeiraParte + '-' + segundaParte;
    }
    else
        return '';
};

//funcao para formatar cpf
function formataCPF(cpf){
    if ((cpf != '') && (cpf != null)){
        let primeira = cpf.substr(0,3);
        let segunda = cpf.substr(3,3);
        let terceira = cpf.substr(6,3);
        let digito = cpf.substr(9,2);
        return primeira + '.' + segunda + '.' + terceira + '-' + digito;
    }
    else
        return '';
};

function formataTelefone(telefone){
    if((telefone != '') && (telefone != null)){
        if(telefone.length == 10){
            let ddd = telefone.substr(0,2);
            let primeira = telefone.substr(2,4);
            let segunda = telefone.substr(6,4);
            return '(' + ddd+ ') ' + primeira + '-' + segunda;
        }
        else {
            let ddd = telefone.substr(0,2);
            let primeira = telefone.substr(2,5);
            let segunda = telefone.substr(7,4);
            return '(' + ddd+ ') ' + primeira + '-' + segunda;
        }
    }
    else
        return '';
};