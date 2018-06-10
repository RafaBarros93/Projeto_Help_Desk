let registros = [];

$(window).on("load", function () {
    carregaCalendario();
});

function montaCalendario(){
    //captura os cabecalhos do calendario
    let cabecalhoContabil = document.getElementById('cabecalho_contabil');
    let cabecalhoFiscal = document.getElementById('cabecalho_fiscal');
    let cabecalhoInterno = document.getElementById('cabecalho_interno');

    //captura os dados do calendario
    let dadosContabil = document.getElementById('dados_contabil');
    let dadosFiscal = document.getElementById('dados_fiscal');
    let dadosInterno = document.getElementById('dados_interno');

    //limpa as informacoes dos cabecalhos
    cabecalhoContabil.innerHTML = '';
    cabecalhoFiscal.innerHTML = '';
    cabecalhoInterno.innerHTML = '';

    //limpa as informacoes dos dados
    dadosContabil.innerHTML = '';
    dadosFiscal.innerHTML = '';
    dadosInterno.innerHTML = '';

    let diaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    let hoje = new Date();

    for(let i = 0; i < 7; i++){
        let data = new Date();
        data.setDate(hoje.getDate()+i);
        let dataFormatada = ajustaData(data);
        //preenche os cabecalhos do calendario
        cabecalhoContabil.innerHTML += `<td class='calendario'>${diaSemana[data.getDay()] + ' ' + formataDataBrasileira(dataFormatada)}</td>`;
        cabecalhoFiscal.innerHTML += `<td class='calendario'>${diaSemana[data.getDay()] + ' ' + formataDataBrasileira(dataFormatada)}</td>`;
        cabecalhoInterno.innerHTML += `<td class='calendario'>${diaSemana[data.getDay()] + ' ' + formataDataBrasileira(dataFormatada)}</td>`;

        let descricaoContabil = '',
            descricaoFiscal = '',
            descricaoInterno = '';

        for(let y = 0; y < registros.length; y++){
            if(registros[y].Data == dataFormatada){
                switch(registros[y].Tipo){
                    case 'C':
                        descricaoContabil += `- ${registros[y].Descricao}<br>`;
                        break;
                    case 'F':
                        descricaoFiscal += `- ${registros[y].Descricao}<br>`;
                        break;
                    case 'I':
                        descricaoInterno += `- ${registros[y].Descricao}<br>`;
                        break;
                    default:
                        break;
                }
            }
        }

        //preenche os dados do calendario
        dadosContabil.innerHTML += `<td rowspan="3" class="dados">${descricaoContabil}</td>`;
        dadosFiscal.innerHTML += `<td rowspan="3" class="dados">${descricaoFiscal}</td>`;
        dadosInterno.innerHTML += `<td rowspan="3" class="dados">${descricaoInterno}</td>`;
    }
}

function ajustaData(data){
     //formata o dias
     dia = data.getDate();
     if (dia< 10) {
         dia  = "0" + dia;
     }
     //formata o mes
     mes = data.getMonth() + 1;
     if (mes < 10) {
         mes  = "0" + mes;
     }
     //formata o ano
     ano = data.getFullYear();
     return ano + '-' + mes + '-' + dia;
}

//funcao para carregar os registros do bd
function carregaCalendario() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/calendarioContabil', false);
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            montaCalendario();
        }
    }
    xhr.send();
}