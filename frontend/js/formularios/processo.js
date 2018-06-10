//variaveis utilizadas na paginacao
var tamanhoPagina = 1000;
var pagina = 0;

function paginaAnterior(){
    if (pagina > 0) {
        pagina--;
        paginar();
        ajustarBotoes();
    }
}

function paginaProxima(){
    if (pagina < listaProcessos.length / tamanhoPagina - 1) {
        pagina++;
        paginar();
        ajustarBotoes();
    }
}

function controlaBotoes(){
    $('#proxima_pagina').prop('disabled', listaProcessos.length <= tamanhoPagina || pagina > listaProcessos.length / tamanhoPagina - 1);
    $('#pagina_anterior').prop('disabled', listaProcessos.length <= tamanhoPagina || pagina == 0);
}

function paginar() {
    
    $('#lista_registros_corpo tr').remove();
    
    for (var i = pagina * tamanhoPagina; i < listaProcessos.length && i < (pagina + 1) *  tamanhoPagina; i++) {
        
        $('#lista_registros_corpo').append(
            '<tr id="linha' + listaProcessos[i]['CodigoProcesso'] +'">' +
                '<td>' + listaProcessos[i]['NumeroProcesso'] + '</td>' +
                '<td>'+listaProcessos[i]['Autor']+'</td>' +
                '<td>'+listaProcessos[i]['ProbabilidadePerda']+'</td>' +
                '<td>'+listaProcessos[i]['TipoContingencia']+'</td>' +
                '<td>'+formatValor(listaProcessos[i]['ValorContingenciaAtualizado'], 'R$ ')+'</td>' +
                '<td>'+listaProcessos[i]['AreaDireito']+'</td>' +
                '<td>'+listaProcessos[i]['ObraDepartamento']+'</td>' +
                '<td style="white-space: nowrap">' +
                    '<button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editar('+listaProcessos[i]['CodigoProcesso']+')"></button>&nbsp;' +
                    '<button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Exlcuir" onclick="excluir('+listaProcessos[i]['CodigoProcesso']+')"></button>&nbsp;'+
                    '<button class="btn btn-success btn-xs glyphicon glyphicon-plus" title="Aditivo" onclick="aditivo('+listaProcessos[i]['CodigoProcesso']+')"></button>&nbsp;'+
                    '<button class="btn btn-success btn-xs glyphicon glyphicon-list-alt" title="Histórico de Aditivos" onclick="historicoAditivo('+listaProcessos[i]['CodigoProcesso']+')"></button>'+
                '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoStatus'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoEmpreiteiro'] + '</td>' +
                '<td hidden></td>' +
                '<td hidden>' + listaProcessos[i]['CodigoProbabilidadePerda'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoFormaParticipacaoEmpresaCitada'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoEmpresaCitada'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoObraDepartamento'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoFuncaoAlegada'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoTipoContingencia'] + '</td>' +
                '<td hidden></td>' +
                '<td hidden>' + listaProcessos[i]['CodigoTipoAcao'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoComarca'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoRegiaoRegional'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoEsfera'] + '</td>' +
                '<td hidden></td>' +
                '<td hidden>' + listaProcessos[i]['CodigoAreaDireito'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoSociedade'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['DataRecebimento'] + '</td>' +
                '<td hidden>' + listaProcessos[i]['DataDistribuicao'] + '</td>' +
                '<td hidden>' + formatValor(listaProcessos[i]['ValorContingencia'], 'R$ ') + '</td>' +
                '<td hidden>' + listaProcessos[i]['Resumo'] + '</td>' +
                '<td hidden>' + formatValor(listaProcessos[i]['PercentualContingencia'], '% ') + '</td>' +
                '<td hidden>' + listaProcessos[i]['Tribunal']+ '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoTipoFuncionario']+ '</td>' +
                '<td hidden>' + listaProcessos[i]['Observacao']+ '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoFase']+ '</td>' +
                '<td hidden>' + listaProcessos[i]['CodigoEscritorio']+ '</td>' +
                '<td hidden>' + formatValor(listaProcessos[i]['ValorCausaInicial'], 'R$ ')+ '</td>' +
                '<td hidden>' + listaProcessos[i]['Objeto']+ '</td>' +
                '<td hidden>'+listaProcessos[i]['PeriodoReclamadoInicial']+'</td>' +
                '<td hidden>'+listaProcessos[i]['PeriodoReclamadoFinal']+'</td>' +
                '<td hidden>' + formatValor(listaProcessos[i]['ValorAtualizado'], 'R$ ') + '</td>' +
                '<td hidden>' + formatValor(listaProcessos[i]['ValorContingenciaGrupoPatrimar'], 'R$ ') + '</td>' +
            '</tr>'
        );
    }
    // controlaBotoes();
}

//objeto que sera manipulado para envio de dados
var processo = {
    CodigoProcesso: null,
    NumeroProcesso: null,
    CodigoSociedade: null,
    CodigoAreaDireito: null,
    CodigoSubAreaDireito: null,
    CodigoEsfera: null,
    CodigoRegiaoRegional: null,
    CodigoComarca: null,
    CodigoTipoAcao: null,
    CodigoGrupo: null,
    DataRecebimento: null,
    DataDistribuicao: null,
    CodigoTipoContingencia: null,
    CodigoFuncaoAlegada: null,
    PeriodoReclamadoInicial: null,
    PeriodoReclamadoFinal: null,
    CodigoObraDepartamento: null,
    CodigoEmpresaCitada: null,
    CodigoFormaParticipacaoEmpresaCitada: null,
    ValorCausaInicial: null,
    ValorAtualizado: null,
    ValorContingencia: null,
    CodigoProbabilidadePerda: null,
    Resumo: null,
    PercentualContigencia: null,
    ValorContingenciaGrupoPatrimar: null,
    CodigoOrigem: null,
    CodigoEmpreiteiro: null,
    Autor: null,
    CodigoStatus: null,
    Tribunal: null,
    CodigoTipoFuncionario: null,
    Observacao: null,
    CodigoUsuario: null,
    CodigoFase: null,
    CodigoEscritorio: null,
    Objeto: null
}

var processoAditivo = {
    CodigoProcesso: null,
    Tribunal: null,
    ValorAtualizado: null,
    CodigoFase: null,
    CodigoEscritorio: null,
    CodigoProbabilidadePerda: null,
    Observacao: null
}

var listaProcessos = [];

//carregando a pagina
$(window).on("load", function(){
    carregaProcessos();
    carregaStatus();
    carregaSociedade();
    carregaAreaDireito();
    carregaEsfera();
    carregaRegiaoRegional();
    carregaComarca();
    carregaTipoAcao();
    carregaTipoContingencia();
    carregaFuncaoAlegada();
    carregaObraDepartamento();
    carregaEmpresaCitada();
    carregaFormaParticipacaoEmpresaCitada();
    carregaProbabilidadePerda();
    carregaEmpreiteiro();
    carregaFase();
    carregaEscritorio();

    //verifica se o tipo de processo é trabalhista para habilitar o campo tipo funcionario
    $('#selAreaDireito').on('change', function() {
        if (this.value === '1'){
            $('#selecao_tipo_funcionario').show();
            $('#selecao_periodo_reclamado_inicial').show();
            $('#selecao_periodo_reclamado_final').show();
            $('#selecao_funcao_alegada').show();
        } else {
            $('#selecao_tipo_funcionario').hide();
            $('#selTipoFuncionario').val(0).change(); 
            $('#selecao_empreiteiro').hide();
            $('#selecao_periodo_reclamado_inicial').hide();
            $('#selecao_periodo_reclamado_final').hide();
            $('#selecao_funcao_alegada').hide();
        }
    });

    //Verifica se o tipo de funcionario é terceiro para habilitar o campo empreiteiro
    $('#selTipoFuncionario').on('change', function() {
        if (this.value === '2'){
            $('#selecao_empreiteiro').show();
        } else { 
            $('#selecao_empreiteiro').hide();
        }
    });

    $('#txtValorCausaInicial').on('change', function() {
        $('#txtValorAtualizado').val(this.value);
    });
    $('#txtValorContingencia').on('change', function(){
        var atualizado = removeMascara(this.value, 'R$ ');
        var percentual = removeMascara($('#txtPercentualContigencia').val(), '% ');
        if((atualizado > 0) && (percentual > 0)) {
            var valor = (atualizado * percentual) / 100;
        }
        $('#txtValorContingenciaAtualizado').val(this.value);   
        $('#txtValorContigenciaPatrimar').val(formatValor(valor, 'R$'));
    });
    $('#txtPercentualContigencia').on('change', function() {
        var atualizado = removeMascara($('#txtValorContingenciaAtualizado').val(), 'R$ ');
        var percentual = removeMascara(this.value, '% ');
    
        if((atualizado > 0) && (percentual > 0)) {
            var valor = (atualizado * percentual) / 100;
        }
        $('#txtValorContigenciaPatrimar').val(formatValor(valor, 'R$'));
    });
    //captura o percentual da contingencia patrimar
    $('#selObraDepartamento').on('change', function() {
        if (this.value > 0 ){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", BASE_URL_SERVICO + "/obraDepartamento/"+this.value);
            xhr.onload = function(){
                if(xhr.status === 200){
                    var data = $.parseJSON(xhr.responseText).result;
                    $('#txtPercentualContigencia').val(formatValor(data[0].PercentualPatrimar, '% ')).change();
                }
            }
            xhr.send();
        } 
    });
});

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtNumeroProcesso').focus();
}); 

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtNumeroProcesso').val('');
    $('#selStatus').val(0);
    $('#txtAutor').val('');
    $('#txtPeriodoReclamadoInicial').val('');
    $('#txtPeriodoReclamadoFinal').val('');
    $('#txtValorCausaInicial').val('');
    $('#txtValorAtualizado').val('');
    $('#txtValorContingencia').val('');
    $('#txtDataRecebimento').val('');
    $('#txtDataDistribuicao').val('');
    $('#txtResumo').val('');
    $('#txtPercentualContigencia').val('');
    $('#txtValorContigenciaPatrimar').val('');
    $('#selSociedade').val(0);
    $('#selAreaDireito').val(0);
    $('#selEsfera').val(0);
    $('#selRegiaoRegional').val(0);
    $('#selComarca').val(0);
    $('#selTipoAcao').val(0);
    $('#selCodigoTipoContingencia').val(0);
    $('#selFuncaoAlegada').val(0);
    $('#selObraDepartamento').val(0);
    $('#selEmpresaCitada').val(0);
    $('#selFormaParticipacaoEmpresaCitada').val(0);
    $('#selProbabilidadePerda').val(0);
    $('#txtTribunal').val('');
    $('#selEmpreiteiro').val(0);
    $('#txtObservacao').val('');
    $('#selFase').val(0);
    $('#selEscritorio').val(0);
    $('#mensagem').hide();
    $('#selecao_tipo_funcionario').hide();
    $('#selecao_empreiteiro').hide();
    $('#selecao_periodo_reclamado_inicial').hide();
    $('#selecao_periodo_reclamado_final').hide();
    $('#selecao_funcao_alegada').hide();
    $('#formulario').modal('show');
};

//funcao para editar um registro
function editar(id){
    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtCodigo').val(id);
    $('#txtNumeroProcesso').val(colunas[0].innerHTML);
    $('#txtAutor').val(colunas[1].innerHTML);    
    $('#txtValorContingenciaAtualizado').val(colunas[4].innerHTML);
    $('#selStatus').val(colunas[8].innerHTML);
    $('#selEmpreiteiro').val(colunas[9].innerHTML);
    $('#selProbabilidadePerda').val(colunas[11].innerHTML);
    $('#selFormaParticipacaoEmpresaCitada').val(colunas[12].innerHTML);
    $('#selEmpresaCitada').val(colunas[13].innerHTML);
    $('#selObraDepartamento').val(colunas[14].innerHTML);
    $('#selFuncaoAlegada').val(colunas[15].innerHTML);
    $('#selCodigoTipoContingencia').val(colunas[16].innerHTML);
    $('#selTipoAcao').val(colunas[18].innerHTML);
    $('#selComarca').val(colunas[19].innerHTML);
    $('#selRegiaoRegional').val(colunas[20].innerHTML);
    $('#selEsfera').val(colunas[21].innerHTML);
    $('#selAreaDireito').val(colunas[23].innerHTML);
    $('#selSociedade').val(colunas[24].innerHTML);
    $('#txtDataRecebimento').val(colunas[25].innerHTML);
    $('#txtDataDistribuicao').val(colunas[26].innerHTML);
    $('#txtValorContingencia').val(colunas[27].innerHTML);
    $('#txtResumo').val(colunas[28].innerHTML);
    $('#txtPercentualContigencia').val(colunas[29].innerHTML);
    $('#txtTribunal').val(colunas[30].innerHTML);
    $('#selTipoFuncionario').val(colunas[31].innerHTML).trigger('change');
    $('#txtObservacao').val(colunas[32].innerHTML);
    $('#selFase').val(colunas[33].innerHTML);
    $('#selEscritorio').val(colunas[34].innerHTML);
    $('#txtValorCausaInicial').val(colunas[35].innerHTML);
    $('#txtObjeto').val(colunas[36].innerHTML);
    $('#txtPeriodoReclamadoInicial').val(colunas[37].innerHTML);
    $('#txtPeriodoReclamadoFinal').val(colunas[38].innerHTML);
    $('#txtValorAtualizado').val(colunas[39].innerHTML);
    $('#txtValorContigenciaPatrimar').val(colunas[40].innerHTML);
    $('#mensagem').hide();
    $('#formulario').modal('show');
};

//funcao para excluir um registro
function excluir(id){
    excluirAditivo(id);
    deletar(id);
    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    //remove a linha da tabela
    linha.remove();
};

//funcao para salvar um registro
function salvar(){
    //le os campos do formulario
    var codigo = $('#txtCodigo').val();
    var numeroProcesso = $('#txtNumeroProcesso').val();
    var status = $('#selStatus').val();
    var autor = $('#txtAutor').val();
    var periodoReclamadoInicial = $('#txtPeriodoReclamadoInicial').val();
    var periodoReclamadoFinal = $('#txtPeriodoReclamadoFinal').val();
    var valorCausaInicial = $('#txtValorCausaInicial').val();
    var valorAtualizado = $('#txtValorAtualizado').val();
    var valorContingencia = $('#txtValorContingencia').val();
    var dataRecebimento = $('#txtDataRecebimento').val();
    var dataDistribuicao = $('#txtDataDistribuicao').val();
    var resumo = $('#txtResumo').val();
    var percentualContingencia = $('#txtPercentualContigencia').val();
    var valorContingenciaPatrimar = $('#txtValorContigenciaPatrimar').val();
    var sociedade = $('#selSociedade').val();
    var areaDireito = $('#selAreaDireito').val();
    var esfera = $('#selEsfera').val();
    var regiaoRegional = $('#selRegiaoRegional').val();
    var comarca = $('#selComarca').val();
    var tipoAcao = $('#selTipoAcao').val();
    var codigoTipoContingencia = $('#selCodigoTipoContingencia').val();
    var funcaoAlegada = $('#selFuncaoAlegada').val();
    var obraDepartamento = $('#selObraDepartamento').val();
    var empresaCitada = $('#selEmpresaCitada').val();
    var formaParticipacaoEmpresaCitada = $('#selFormaParticipacaoEmpresaCitada').val();
    var probabilidadePerda = $('#selProbabilidadePerda').val();
    var empreiteiro = $('#selEmpreiteiro').val();
    var tribunal = $('#txtTribunal').val();
    var tipoFuncionario = $('#selTipoFuncionario').val();
    var observacaoProcesso = $('#txtObservacao').val();
    var fase = $('#selFase').val();
    var escritorio = $('#selEscritorio').val();
    var valorContingenciaAtualizado = $('#txtValorContingenciaAtualizado').val();
    var objeto = $('#txtObjeto').val();
    var descricaoProbabilidadePerda = $('#selProbabilidadePerda option:selected').text();
    var descricaoTipoContingencia = $('#selCodigoTipoContingencia option:selected').text();
    var descricaoAreaDireito = $('#selAreaDireito option:selected').text();
    var descricaoObra = $('#selObraDepartamento option:selected').text();

    //verifica os campos obrigatorios
    if (((numeroProcesso == '') || (areaDireito == '0') || (status == '0') ||
        (autor == '') || (obraDepartamento == '0') || (probabilidadePerda == '0') ||
        (escritorio == '0') || (esfera == '0') || (comarca == '0') || (codigoTipoContingencia == '0'))  
        || (((probabilidadePerda === '1') || (probabilidadePerda === '2')) && (parseFloat(removeMascara(valorContingencia, 'R$ ')) <= 0)))
    {
        if (((probabilidadePerda === '1') || (probabilidadePerda === '2')) && (parseFloat(removeMascara(valorContingencia, 'R$ ')) <= 0)) {
            var msg = $('#msg_alerta').text();
            msg += ' O valor da contingência é obrigatório.';
            $('#msg_alerta').text(msg);
        }
        $('#mensagem').show();
        $('#txtNumeroProcesso').focus();
    }
    else {
        //prepara o objeto a ser gravado
        if (codigo !== '0')
            processo.CodigoProcesso = codigo;
        processo.Autor = autor;
        processo.CodigoStatus = status;
        processo.NumeroProcesso = numeroProcesso;
        processo.PeriodoReclamadoInicial = formataData(periodoReclamadoInicial);
        processo.PeriodoReclamadoFinal = formataData(periodoReclamadoFinal);
        processo.ValorCausaInicial = removeMascara(valorCausaInicial, 'R$ ');
        processo.ValorAtualizado = removeMascara(valorAtualizado, 'R$ ');
        processo.ValorContingencia = removeMascara(valorContingencia, 'R$ ');
        processo.ValorContingenciaAtualizado = removeMascara(valorContingenciaAtualizado, 'R$ ');
        processo.DataRecebimento = formataData(dataRecebimento);
        processo.DataDistribuicao = formataData(dataDistribuicao);
        processo.Resumo = resumo;
        processo.PercentualContingencia = removeMascara(percentualContingencia, '% ');
        processo.ValorContingenciaGrupoPatrimar = removeMascara(valorContingenciaPatrimar, 'R$ ');
        if (sociedade !== '0')
            processo.CodigoSociedade = sociedade;
        if (areaDireito !== '0')
            processo.CodigoAreaDireito = areaDireito;
        if (esfera !== '0')
            processo.CodigoEsfera = esfera;
        if (regiaoRegional !== '0')
            processo.CodigoRegiaoRegional = regiaoRegional;
        if (comarca !== '0')
            processo.CodigoComarca = comarca;
        if (tipoAcao !== '0')
            processo.CodigoTipoAcao = tipoAcao;
        if (codigoTipoContingencia !== '0')
            processo.CodigoTipoContingencia = codigoTipoContingencia;
        if (funcaoAlegada !== '0')
            processo.CodigoFuncaoAlegada = funcaoAlegada;
        if (obraDepartamento !== '0')
            processo.CodigoObraDepartamento = obraDepartamento;
        if (empresaCitada !== '0')
            processo.CodigoEmpresaCitada = empresaCitada;
        if (formaParticipacaoEmpresaCitada !== '0')
            processo.CodigoFormaParticipacaoEmpresaCitada = formaParticipacaoEmpresaCitada;
        if (probabilidadePerda !== '0')
            processo.CodigoProbabilidadePerda = probabilidadePerda;
        if (empreiteiro !== '0')
            processo.CodigoEmpreiteiro = empreiteiro;
        processo.Tribunal = tribunal;
        if (tipoFuncionario !== '0')
            processo.CodigoTipoFuncionario = tipoFuncionario;
        
        //captura o codigo do usuario
        var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
        processo.CodigoUsuario = cookie.CodigoUsuario;
        processo.Objeto = objeto;
        processo.Observacao = observacaoProcesso;
        if (fase !== '0')
            processo.CodigoFase = fase;
        if (escritorio !== '0')
            processo.CodigoEscritorio = escritorio;
        
        var dados = JSON.stringify(processo);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);
            
            $('#lista_registros_corpo').append(
                '<tr id="linha' + novoCodigo +'">' +
                    '<td>' + numeroProcesso + '</td>' +
                    '<td>'+autor+'</td>' +
                    '<td>'+descricaoProbabilidadePerda+'</td>' +
                    '<td>'+descricaoTipoContingencia+'</td>' +
                    '<td>' + valorContingenciaAtualizado + '</td>' +
                    '<td>'+descricaoAreaDireito+'</td>' +
                    '<td>'+descricaoObra+'</td>' +
                    '<td style="white-space: nowrap">' +
                        '<button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editar('+novoCodigo+')"></button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="excluir('+novoCodigo+')"></button>&nbsp;'+
                        '<button class="btn btn-success btn-xs glyphicon glyphicon-plus" title="Aditivo" onclick="aditivo('+novoCodigo+')"></button>&nbsp;'+
                        '<button class="btn btn-success btn-xs glyphicon glyphicon-list-alt" title="Histórico de Aditivos" onclick="historicoAditivo('+novoCodigo+')"></button>'+
                    '</td>' +
                    '<td hidden>' + status + '</td>' +
                    '<td hidden>' + empreiteiro + '</td>' +
                    '<td hidden></td>' +
                    '<td hidden>' + probabilidadePerda + '</td>' +
                    '<td hidden>' + formaParticipacaoEmpresaCitada + '</td>' +
                    '<td hidden>' + empresaCitada + '</td>' +
                    '<td hidden>' + obraDepartamento + '</td>' +
                    '<td hidden>' + funcaoAlegada + '</td>' +
                    '<td hidden>' + codigoTipoContingencia + '</td>' +
                    '<td hidden></td>' +
                    '<td hidden>' + tipoAcao + '</td>' +
                    '<td hidden>' + comarca + '</td>' +
                    '<td hidden>' + regiaoRegional + '</td>' +
                    '<td hidden>' + esfera + '</td>' +
                    '<td hidden></td>' +
                    '<td hidden>' + areaDireito + '</td>' +
                    '<td hidden>' + sociedade + '</td>' +
                    '<td hidden>' + dataRecebimento + '</td>' +
                    '<td hidden>' + dataDistribuicao + '</td>' +
                    '<td hidden>' + valorContingencia + '</td>' +
                    '<td hidden>' + resumo + '</td>' +
                    '<td hidden>' + percentualContingencia + '</td>' +
                    '<td hidden>' + tribunal + '</td>' +
                    '<td hidden>' + tipoFuncionario + '</td>' +
                    '<td hidden>' + observacaoProcesso + '</td>' +
                    '<td hidden>' + fase + '</td>' +
                    '<td hidden>' + escritorio + '</td>' +
                    '<td hidden>'+ valorCausaInicial+'</td>' +
                    '<td hidden>' + objeto + '</td>' +
                    '<td hidden>'+periodoReclamadoInicial+'</td>' +
                    '<td hidden>'+periodoReclamadoFinal+'</td>' +
                    '<td hidden>' + valorAtualizado + '</td>' +
                    '<td hidden>' + valorContingenciaPatrimar + '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = numeroProcesso;
            colunas[1].innerHTML = autor;
            colunas[2].innerHTML = descricaoProbabilidadePerda;
            colunas[3].innerHTML = descricaoTipoContingencia;
            colunas[4].innerHTML = valorContingenciaAtualizado;
            colunas[5].innerHTML = descricaoAreaDireito;
            colunas[6].innerHTML = descricaoObra;
            colunas[8].innerHTML = status;
            colunas[9].innerHTML = empreiteiro;
            colunas[10].innerHTML = '';
            colunas[11].innerHTML = probabilidadePerda;
            colunas[12].innerHTML = formaParticipacaoEmpresaCitada;
            colunas[13].innerHTML = empresaCitada;
            colunas[14].innerHTML = obraDepartamento;
            colunas[15].innerHTML = funcaoAlegada;
            colunas[16].innerHTML = codigoTipoContingencia;
            colunas[17].innerHTML = '';
            colunas[18].innerHTML = tipoAcao;
            colunas[19].innerHTML = comarca;
            colunas[20].innerHTML = regiaoRegional;
            colunas[21].innerHTML = esfera;
            colunas[22].innerHTML = '';
            colunas[23].innerHTML = areaDireito;
            colunas[24].innerHTML = sociedade;
            colunas[25].innerHTML = dataRecebimento;
            colunas[26].innerHTML = dataDistribuicao;
            colunas[27].innerHTML = valorContingencia;
            colunas[28].innerHTML = resumo;
            colunas[29].innerHTML = percentualContingencia;
            colunas[30].innerHTML = tribunal;
            colunas[31].innerHTML = tipoFuncionario;
            colunas[32].innerHTML = observacaoProcesso;
            colunas[33].innerHTML = fase;
            colunas[34].innerHTML = escritorio;
            colunas[35].innerHTML = valorCausaInicial;
            colunas[36].innerHTML = objeto;
            colunas[37].innerHTML = periodoReclamadoInicial;
            colunas[38].innerHTML = periodoReclamadoFinal;
            colunas[39].innerHTML = valorAtualizado;
            colunas[40].innerHTML = valorContingenciaPatrimar;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para inserir um aditivo
function aditivo(id){
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#mensagem_aditivo').hide();
    $('#txtCodigoProcesso').val(id);
    $('#txtNumeroProcessoAditivo').val(colunas[0].innerHTML);
    $('#txtTribunalAditivo').val(colunas[30].innerHTML);
    $('#txtValorAtualizadoAditivo').val(colunas[39].innerHTML);
    $('#txtObservacaoAditivo').val('');
    $('#selFaseAditivo').val(colunas[33].innerHTML);
    $('#selEscritorioAditivo').val(colunas[34].innerHTML);
    $('#selProbabilidadeAditivo').val(colunas[11].innerHTML);
    $('#txtValorContingenciaAtualizadoAditivo').val(colunas[4].innerHTML);
    $('#formulario_aditivo').modal('show');
}

//funcao para exibir o historico dos aditivos
function historicoAditivo(id){
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtNumeroProcessoHistoricoAditivo').val(colunas[0].innerHTML);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/processoAditivo/"+id);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#lista_historico_aditivo').append(
                        '<tr>' +
                            '<td>' + data[i].Tribunal + '</td>'+
                            '<td>' + formatValor(data[i].ValorAtualizado, 'R$ ') + '</td>'+
                            '<td>' + data[i].Escritorio + '</td>'+
                            '<td>' + data[i].Fase + '</td>'+
                            '<td>' + data[i].Probabilidade + '</td>'+
                            '<td>' + data[i].Observacao + '</td>'+
                            '<td>' + formatValor(data[i].ValorContingenciaAtualizado, 'R$ ') + '</td>'+
                        '</tr>'
                );
            }
        }
    }
    xhr.send();
    $('#formulario_historico_aditivo').modal('show');
}

//funcao para salvar o aditivo
function salvarAditivo(){
    
    var codigoProcesso = $('#txtCodigoProcesso').val();
    var linha = document.getElementById("linha"+codigoProcesso);
    var colunas = linha.getElementsByTagName('td');

    var percentualContingencia = parseFloat(removeMascara(colunas[29].innerHTML, '% '));
    var observacaoProcesso = colunas[32].innerHTML;
    var faseAditivo = $('#selFaseAditivo').val();
    var escritorioAditivo = $('#selEscritorioAditivo').val();
    var codigoProbabilidadePerda = $('#selProbabilidadeAditivo').val();
    var tribunalAdidito = $('#txtTribunalAditivo').val();
    var observacaoAditivo = $('#txtObservacaoAditivo').val();
    var valorAtualizadoAditivo = removeMascara($('#txtValorAtualizadoAditivo').val(), 'R$ ');
    valorAtualizadoAditivo = parseFloat(valorAtualizadoAditivo);
    var valorContingenciaAtualizado = removeMascara($('#txtValorContingenciaAtualizadoAditivo').val(), 'R$ ');
    valorContingenciaAtualizado = parseFloat(valorContingenciaAtualizado);

    if((tribunalAdidito === '') || (valorAtualizadoAditivo <= 0)){
        $('#mensagem_aditivo').show();
    } else {
        processoAditivo.CodigoProcesso = codigoProcesso;
        processoAditivo.Tribunal = tribunalAdidito;
        processoAditivo.ValorAtualizado = valorAtualizadoAditivo;
        processoAditivo.Observacao = observacaoAditivo;
        processoAditivo.ValorContingenciaAtualizado = valorContingenciaAtualizado;
        if(faseAditivo !== '0')
            processoAditivo.CodigoFase = faseAditivo;
        if(escritorioAditivo !== '0')
            processoAditivo.CodigoEscritorio = escritorioAditivo;
        if(codigoProbabilidadePerda !== '0')
            processoAditivo.CodigoProbabilidadePerda = codigoProbabilidadePerda;
        //grava o aditivo
        var dados = JSON.stringify(processoAditivo);
        gravarAditivo(dados);
        //atualiza o processo
        processo.CodigoProcesso = codigoProcesso;
        processo.Tribunal = tribunalAdidito;
        processo.valorAtualizado = valorAtualizadoAditivo; 
        if (percentualContingencia > 0) 
            processo.ValorContingenciaGrupoPatrimar = valorContingenciaAtualizado * percentualContingencia /100;
        if(observacaoAditivo !== '')
            processo.Observacao = observacaoProcesso + '\n' +observacaoAditivo;
        if (faseAditivo !== '0')
            processo.CodigoFase = faseAditivo;
        if (escritorioAditivo !== '0')
            processo.CodigoEscritorio = escritorioAditivo;
        if(codigoProbabilidadePerda !== '0')
            processo.CodigoProbabilidadePerda = codigoProbabilidadePerda;
        processo.ValorContingenciaAtualizado = valorContingenciaAtualizado;
        dados = JSON.stringify(processo);
        alterar(dados);

        //Atualiza a informacao na tabela
        colunas[39].innerHTML = formatValor(valorAtualizadoAditivo, 'R$');
        colunas[40].innerHTML = formatValor(valorContingenciaAtualizado * percentualContingencia /100, 'R$');
        colunas[30].innerHTML = tribunalAdidito;
        if(observacaoProcesso !== '')
            colunas[32].innerHTML = observacaoProcesso + '\n' +observacaoAditivo;
        else
            colunas[32].innerHTML = observacaoAditivo;
        colunas[33].innerHTML = faseAditivo;
        colunas[4].innerHTML = formatValor(valorContingenciaAtualizado, 'R$');
        $('#formulario_aditivo').modal('hide');
    }
}

//funcao para gravar um novo registro no bd
function gravarAditivo(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/processoAditivo");//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para excluir aditivos de um processo
function excluirAditivo(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/processoAditivo/"+id);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/processo", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para alterar um registro no bd
function alterar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/processo");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/processo/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar as comarcas
function carregaProcessos(){
    var xhr = new XMLHttpRequest();
    //captura o codigo do usuario
    var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
    usuario = cookie.CodigoUsuario;
    visualizarTodosProcessos = cookie.VisualizarTodosProcessos;
    if(visualizarTodosProcessos !== 'S')
        xhr.open("GET", BASE_URL_SERVICO + "/processo/"+usuario, false);
    else 
        xhr.open("GET", BASE_URL_SERVICO + "/processo/", false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            listaProcessos = data;
            paginar();
        }
    }
    xhr.send();
};

//funcao para carregar os status
function carregaStatus(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/status");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selStatus').append(
                        '<option value="' + data[i].CodigoStatus + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar os status
function carregaSociedade(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/sociedade");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selSociedade').append(
                        '<option value="' + data[i].CodigoSociedade + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar os area direito
function carregaAreaDireito(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/areaDireito");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selAreaDireito').append(
                        '<option value="' + data[i].CodigoAreaDireito + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar os area esfera
function carregaEsfera(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/esfera");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selEsfera').append(
                        '<option value="' + data[i].CodigoEsfera + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar regiao regional
function carregaRegiaoRegional(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/regiaoRegional");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selRegiaoRegional').append(
                        '<option value="' + data[i].CodigoRegiaoRegional + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar comarca
function carregaComarca(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/comarca");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selComarca').append(
                        '<option value="' + data[i].CodigoComarca + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar tipoAcao
function carregaTipoAcao(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/tipoAcao");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selTipoAcao').append(
                        '<option value="' + data[i].CodigoTipoAcao + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar grupo
function carregaTipoContingencia(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/tipoContingencia");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selCodigoTipoContingencia').append(
                        '<option value="' + data[i].CodigoTipoContingencia + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar funcaoAlegada
function carregaFuncaoAlegada(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/funcaoAlegada");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selFuncaoAlegada').append(
                        '<option value="' + data[i].CodigoFuncaoAlegada + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar obra departamento
function carregaObraDepartamento(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/obraDepartamento");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selObraDepartamento').append(
                        '<option value="' + data[i].CodigoObraDepartamento + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar empresa citada
function carregaEmpresaCitada(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/empresa");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selEmpresaCitada').append(
                        '<option value="' + data[i].CodigoEmpresa + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar forma participacao empresa citada
function carregaFormaParticipacaoEmpresaCitada(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/formaParticipacaoEmpresa");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selFormaParticipacaoEmpresaCitada').append(
                        '<option value="' + data[i].CodigoFormaParticipacaoEmpresa + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar probabilidade perda
function carregaProbabilidadePerda(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/probabilidadePerda");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selProbabilidadePerda').append(
                        '<option value="' + data[i].CodigoProbabilidadePerda + '">' + data[i].Descricao + '</option>'
                );
                $('#selProbabilidadeAditivo').append(
                    '<option value="' + data[i].CodigoProbabilidadePerda + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar empreiteiro
function carregaEmpreiteiro(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/empreiteiro");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selEmpreiteiro').append(
                        '<option value="' + data[i].CodigoEmpreiteiro + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar fase do projeto
function carregaFase(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/fase");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selFase').append(
                        '<option value="' + data[i].CodigoFase + '">' + data[i].Descricao + '</option>'
                );
                $('#selFaseAditivo').append(
                    '<option value="' + data[i].CodigoFase + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar escritório
function carregaEscritorio(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/escritorio");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selEscritorio').append(
                        '<option value="' + data[i].CodigoEscritorio + '">' + data[i].Descricao + '</option>'
                );
                $('#selEscritorioAditivo').append(
                    '<option value="' + data[i].CodigoEscritorio + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};