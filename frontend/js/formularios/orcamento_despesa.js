var qtdeValores = 1;
var qtdeMaxValores = 12;
var registros = [];

function controlaPanel(exibeFormulario){
    if(exibeFormulario){
        $('#formulario').show();
        $('#lista').hide();
        $('#filtros').hide();
    }
    else {
        $('#formulario').hide();
        $('#lista').show();
        $('#filtros').show();
    }
}

function preencheTable(){
    let tabela = document.getElementById('lista_corpo');
    tabela.innerHTML = '';
    for(i = 0; i < registros.length; i++){
        tabela.innerHTML += 
            '<tr>'+
                '<td>' + registros[i].MesPorExtenso + '</td>' +
                '<td>' + formatValor(registros[i].Valor, 'R$ ') + '</td>' +
                '<td>' + registros[i].Coligada + '</td>' +
                '<td>' + registros[i].DescricaoCentroCusto + '</td>' +
                '<td>' + registros[i].Grupo + '</td>' +
                '<td>' + registros[i].ContaOrcamento + '</td>' +
                '<td>' + registros[i].DescricaoContaContabil + '</td>' +
                '<td style="white-space: nowrap">' + 
                    '<button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(' + i +')"></button>&nbsp;' +
                    '<button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmar(' + i + ')"></button>' +
                '</td>' +
            '</tr>';
    }
}

function exibirConfirmar(indice){
    let mensagem = document.getElementById('mensagem_modal_confirmar');
    mensagem.innerHTML = 'Atenção! Confirma a exclusão do registro?';
    //captura o button de confirmar do modal_confirmar
    let btnModalConfirmar = document.getElementById('btnModalConfirmar');
    //cria o evento onclick
    let onClick = document.createAttribute('onclick');
    //define o evento onclick
    onClick.value = 'excluirRegistro('+indice+')';
    //atribui ao elemento html
    btnModalConfirmar.attributes.setNamedItem(onClick);
    $('#modal_confirmar').modal('show');
}

function novoRegistro(){
    controlaPanel(true);
    document.getElementById('formulario').reset();
    repetirValor(12, true);
    let data = new Date;
    $('#txtAno').val(data.getFullYear());
}

function cancelarRegistro(){
    controlaPanel(false);
    preencheTable();
}

function editarRegistro(indice){
    for(i = 2; i <= qtdeValores; i++){
        $('#linha' + i).remove();
    }
    qtdeValores = 1;
    document.getElementById('txtCodigo').value = indice;
    document.getElementById('selColigada').value = registros[indice].CodigoColigada;
    document.getElementById('selColigada').change;
    document.getElementById('selCentroCusto').value = registros[indice].CentroCusto;
    document.getElementById('selCentroCusto').change;
    document.getElementById('selGrupo').value = registros[indice].Grupo;
    document.getElementById('selGrupo').change;
    document.getElementById('selContaOrcamento').value = registros[indice].ContaOrcamento;
    document.getElementById('selContaOrcamento').change;
    document.getElementById('selContaContabil').value = registros[indice].ContaContabil;
    document.getElementById('txtFornecedor').value = registros[indice].Fornecedor;
    document.getElementById('txtHistorico').value = registros[indice].Historico;
    document.getElementById('txtAno').value = registros[indice].Ano;
    document.getElementById('selMes1').value = registros[indice].Mes;
    document.getElementById('txtValor1').value = formatValor(registros[indice].Valor, 'R$ ');
    document.getElementById('txtObservacao1').value = registros[indice].Observacao;
    controlaPanel(true);
}

//funcao que chama o formulario modal
function exibirModalQtde(){
    $('#formulario_repetir').modal('show');
}

//funcao para repetir o valor
function repetirValor(repeticao, ajustaValor){
    $('#formulario_repetir').modal('hide');

    var item = document.getElementById('lista_valores').lastChild;
 
    var qtde = repeticao;//$('#txtQtde').val();
    if (parseInt(qtde) > 0){
        for(i = 0; i < qtde; i++){
            novoValor(ajustaValor);
            $('#txtValor'+qtdeValores).val($('#txtValor1').val());
            $('#txtObservacao'+qtdeValores).val($('#txtObservacao1').val());
        }
    }
}

//funcao para excluir um registro
function excluirRegistro(indice){
    $('#modal_confirmar').modal('hide');
    let codigo = registros[indice].CodigoOrcamentoDespesa;
    deletarBD(codigo);
    //verifica se o indice a ser deletado é o ultimo do array de registros
    if (indice === registros.length -1){
        registros.pop();
    } else if (indice === 0) { //verifica se o indice a ser deletado é o primeiro do array de registros
        registros.shift();
    } else { 
        let auxInicio = registros.slice(0,indice);
        let auxFim = registros.slice(indice+1);
        registros = auxInicio.concat(auxFim);
    }
    preencheTable();
}

function salvarRegistro(){
    //captura os valores preenchidos
    var codigo = $('#txtCodigo').val();
    var codigoColigada = $('#selColigada').val();
    var centroCusto = $('#selCentroCusto').val();
    var grupo = $('#selGrupo').val();
    var contaOrcamento = $('#selContaOrcamento').val();
    var contaContabil = $('#selContaContabil').val();
    var fornecedor = $('#txtFornecedor').val();
    var historico = $('#txtHistorico').val();
    var ano = $('#txtAno').val();

    var orcamento = {};
    for (var i = 1; i <= qtdeValores; i++){
        if (removeMascara($('#txtValor'+i).val(), 'R$ ') != '0.00'){
            orcamento.CodigoColigada = codigoColigada;
            orcamento.CentroCusto = centroCusto;
            orcamento.Grupo = grupo;
            orcamento.ContaOrcamento = contaOrcamento;
            orcamento.ContaContabil = contaContabil;
            orcamento.Fornecedor = fornecedor;
            orcamento.Historico = historico;
            orcamento.Ano = ano;
            orcamento.valor = removeMascara($('#txtValor'+i).val(), 'R$ ');
            orcamento.Observacao = $('#txtObservacao'+i).val();
            orcamento.Mes = $('#selMes'+i).val();
            if ($('#txtQtdeDiarias'+i).val() != '')
                orcamento.Diarias = $('#txtQtdeDiarias'+i).val();
            if ($('#txtQtdeViagem'+i).val() != '')
                orcamento.QuantidadeViagens = $('#txtQtdeViagem'+i).val();
            if ($('#txtDestino'+i).val() != '')
                orcamento.Destino = $('#txtDestino'+i).val();

            //captura o codigo do usuario
            var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
            orcamento.InseridoPor = cookie.CodigoUsuario;
            var dataAtual = new Date;
            orcamento.InseridoEm = dataAtual.getFullYear() + '-' + (dataAtual.getMonth()+1) + '-' + dataAtual.getDate() + ' ' + dataAtual.getHours() + ':' + dataAtual.getMinutes() + ':' + dataAtual.getSeconds() + '.' + dataAtual.getMilliseconds();

            if (codigo != '') {
                orcamento.CodigoOrcamentoDespesa = registros[codigo].CodigoOrcamentoDespesa;
                var dados = JSON.stringify(orcamento);
                editarDB(dados);
            }
            else {
                var dados = JSON.stringify(orcamento);
                gravar(dados); 
            }
        }
    }
}

//funcao para inserir um novo valor
function novoValor(ajustaValor){
    if (qtdeValores < qtdeMaxValores){
        qtdeValores++;
        var contaOrcamento = $('#selContaOrcamento').val();
        var contaContabil = $('#selContaContabil').val();
        $('#lista_valores').append(
            '<li class="list-group-item" id="linha'+ qtdeValores +'">'+
                '<div class="form-group row">'+            
                    '<div class="form-group-sm col-sm-12 col-md-2">'+
                        '<label class="control-label" for="selMes'+qtdeValores+'">Mês</label>'+
                        '<select id="selMes'+qtdeValores+'" class="form-control input-sm">'+
                            '<option value="1">Janeiro</option>'+
                            '<option value="2">Fevereiro</option>'+
                            '<option value="3">Março</option>'+
                            '<option value="4">Abril</option>'+
                            '<option value="5">Maio</option>'+
                            '<option value="6">Junho</option>'+
                            '<option value="7">Julho</option>'+
                            '<option value="8">Agosto</option>'+
                            '<option value="9">Setembro</option>'+
                            '<option value="10">Outubro</option>'+
                            '<option value="11">Novembro</option>'+
                            '<option value="12">Dezembro</option>'+
                        '</select>'+
                    '</div>'+
                    '<div class="form-group-sm col-sm-12 col-md-2" id="divValor' + qtdeValores + '">'+
                        '<label class="control-label" for="txtValor'+qtdeValores+'">Valor</label>'+
                        '<input type="text" id="txtValor'+qtdeValores+'" class="form-control valor" value="R$ 0,00">'+
                    '</div>'+
                    '<div class="form-group-sm col-sm-12 col-md-2" id="divQtdeViagem' + qtdeValores + '" hidden>' +
                        '<label class="control-label" for="txtQtdeViagem'+qtdeValores+'">Qtde. de Viagens</label>' +
                        '<input type="number" id="txtQtdeViagem'+qtdeValores+'" class="form-control">' +
                    '</div>' +
                    '<div class="form-group-sm col-sm-12 col-md-2" id="divQtdeDiarias' + qtdeValores + '" hidden>' +
                        '<label class="control-label" for="txtQtdeDiarias'+qtdeValores+'">Nº Diárias</label>' +
                        '<input type="number" id="txtQtdeDiarias'+qtdeValores+'" class="form-control">' +
                    '</div>' +
                    '<div class="form-group-sm col-sm-12 col-md-8" id="divDestino' + qtdeValores + '" hidden>'+
                        '<label class="control-label" for="txtDestino'+qtdeValores+'">Destino</label>'+
                        '<input type="text" id="txtDestino'+qtdeValores+'" class="form-control">'+
                    '</div>'+
                    '<div class="form-group-sm col-sm-12 col-md-8" id="divObservacao' + qtdeValores + '">'+
                        '<label class="control-label" for="txtObservacao'+qtdeValores+'">Observação</label>'+
                        '<input type="text" id="txtObservacao'+qtdeValores+'" class="form-control">'+
                    '</div>'+
                '</div>'+      
            '</li>'
        );
        $("#selMes" + qtdeValores).val(qtdeValores); 
        if(ajustaValor)
            $("#txtValor"+ qtdeValores).maskMoney({showSymbol:true, symbol:"R$ ", decimal:",", thousands:"."});
    }
}

//funcao para carregar as coligadas
function carregaColigadas(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/coligadas", false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selColigada').append(
                        '<option value="'+ data[i].Codigo + '">' + data[i].Nome + '</option>'
                );
                $('#selColigadaP').append(
                    '<option value="'+ data[i].Codigo + '">' + data[i].Nome + '</option>'
                );
            }
        }
    }
    xhr.send();
}

function carregaCentroCusto(coligada){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/centroCustoOrcamentoDespesa/" + coligada, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selCentroCusto').innerHTML = '';
            document.getElementById('selCentroCustoP').innerHTML = '';
            $('#selCentroCusto').append('<option value=""></option>');
            $('#selCentroCustoP').append('<option value=""></option>');
            for(i = 0; i < data.length; i++){
                $('#selCentroCusto').append(
                        '<option value="'+ data[i].Codigo + '">' + data[i].CENTROCUSTO + '</option>'
                );
                $('#selCentroCustoP').append(
                    '<option value="'+ data[i].Codigo + '">' + data[i].CENTROCUSTO + '</option>'
                );
            }
        }
    }
    xhr.send();
}

function carregaGrupo(coligada, centroCusto){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/grupoOrcamentoDespesa/" + coligada + "/" + centroCusto, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selGrupo').innerHTML = '';
            document.getElementById('selGrupoP').innerHTML = '';
            $('#selGrupo').append('<option value=""></option>');
            $('#selGrupoP').append('<option value=""></option>');
            for(i = 0; i < data.length; i++){
                $('#selGrupo').append(
                        '<option value="'+ data[i].GRUPO + '">' + data[i].GRUPO + '</option>'
                );
                $('#selGrupoP').append(
                    '<option value="'+ data[i].GRUPO + '">' + data[i].GRUPO + '</option>'
                 );
            }
        }
    }
    xhr.send();
}

function carregaContaOrcamento(coligada, centroCusto, grupo){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/contaOrcamentoDespesa/" + coligada + "/" + centroCusto + "/" + grupo, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selContaOrcamento').innerHTML = '';
            document.getElementById('selContaOrcamentoP').innerHTML = '';
            $('#selContaOrcamento').append('<option value=""></option>');
            $('#selContaOrcamentoP').append('<option value=""></option>');
            for(i = 0; i < data.length; i++){
                $('#selContaOrcamento').append(
                        '<option value="'+ data[i].CONTAORCAMENTO + '">' + data[i].CONTAORCAMENTO + '</option>'
                );
                $('#selContaOrcamentoP').append(
                    '<option value="'+ data[i].CONTAORCAMENTO + '">' + data[i].CONTAORCAMENTO + '</option>'
                );
            }
        }
    }
    xhr.send();
}

function carregaContaContabil(coligada, centroCusto, grupo, contaOrcamento){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/contaContabilOrcamentoDespesa/" + coligada + "/" + centroCusto + "/" + grupo + "/" + contaOrcamento, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selContaContabil').innerHTML = '';
            document.getElementById('selContaContabilP').innerHTML = '';
            $('#selContaContabil').append('<option value=""></option>');
            $('#selContaContabilP').append('<option value=""></option>');
            for(i = 0; i < data.length; i++){
                $('#selContaContabil').append(
                        '<option value="'+ data[i].Codigo + '">' + data[i].CONTACONTABIL + '</option>'
                );
                $('#selContaContabilP').append(
                    '<option value="'+ data[i].Codigo + '">' + data[i].CONTACONTABIL + '</option>'
                );
            }
        }
    }
    xhr.send();
}

function carregaRegistros(){ 

    let coligada = $('#selColigadaP').val();
    let centroCusto = $('#selCentroCustoP').val();
    let grupo = $('#selGrupoP').val();
    let contaContabil = $('#selContaContabilP').val();
    let contaOrcamento = $('#selContaOrcamentoP').val();
    let ano = $('#txtAnoP').val();

    //salva os filtros
    let filtros = {
        Coligada: coligada,
        CentroCusto: centroCusto,
        Grupo: grupo,
        ContaContabil: contaContabil,
        ContaOrcamento: contaOrcamento,
        Ano: ano
    }

    filtros = JSON.stringify(filtros);
    localStorage.setItem('filtros_orcamento_despesa', filtros);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/orcamentoDespesa/"+coligada+"/"+centroCusto+"/"+grupo+"/"+contaOrcamento+"/"+contaContabil+"/"+ano, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}

$(window).on("load", function(){
    carregaColigadas();
    let data = new Date;
    $('#txtAnoP').val(data.getFullYear());
    carregaFiltros();
});

function carregaFiltros(){
    let filtros = localStorage.getItem('filtros_orcamento_despesa');
    filtros = JSON.parse(filtros);

    if (filtros != null){
        document.getElementById('selColigadaP').value = filtros.Coligada;
        carregaCentroCusto(filtros.Coligada);
        document.getElementById('selCentroCustoP').value = filtros.CentroCusto;
        carregaGrupo(filtros.Coligada, filtros.CentroCusto);
        document.getElementById('selGrupoP').value = filtros.Grupo;
        carregaContaOrcamento(filtros.Coligada, filtros.CentroCusto, filtros.Grupo);
        document.getElementById('selContaOrcamentoP').value = filtros.ContaOrcamento;
        carregaContaContabil(filtros.Coligada, filtros.CentroCusto, filtros.Grupo, filtros.ContaOrcamento);
        document.getElementById('selContaContabilP').value = filtros.ContaContabil;
        carregaRegistros();
    }
};

$('#selColigada').on('change', function() {
    if (this.value > 0){
        carregaCentroCusto(this.value);
    }
});

$('#selColigadaP').on('change', function() {
    if (this.value > 0){
        carregaCentroCusto(this.value);
    }
});

$('#selCentroCusto').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigada').val();
        carregaGrupo(coligada, this.value);
    }
});

$('#selCentroCustoP').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigadaP').val();
        carregaGrupo(coligada, this.value);
    }
});

$('#selGrupo').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigada').val();
        centroCusto = $('#selCentroCusto').val();
        carregaContaOrcamento(coligada, centroCusto, this.value);
    }
});

$('#selGrupoP').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigadaP').val();
        centroCusto = $('#selCentroCustoP').val();
        carregaContaOrcamento(coligada, centroCusto, this.value);
    }
});

$('#selContaOrcamento').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigada').val();
        centroCusto = $('#selCentroCusto').val();
        grupo = $('#selGrupo').val();
        carregaContaContabil(coligada, centroCusto, grupo, this.value);
    }
});

$('#selContaOrcamentoP').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigadaP').val();
        centroCusto = $('#selCentroCustoP').val();
        grupo = $('#selGrupoP').val();
        carregaContaContabil(coligada, centroCusto, grupo, this.value);
    }
});

$('#selContaContabil').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigada').val();
        centroCusto = $('#selCentroCusto').val();
        grupo = $('#selGrupo').val();
        contaOrcamento = $('#selContaOrcamento').val();
    }
});

$('#selContaContabilP').on('change', function() {
    if(this.value != ''){
        coligada = $('#selColigadaP').val();
        centroCusto = $('#selCentroCustoP').val();
        grupo = $('#selGrupoP').val();
        contaOrcamento = $('#selContaOrcamentoP').val();
    }
});

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/orcamentoDespesa", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para deletar um registro no bd
function deletarBD(id){
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/orcamentoDespesa/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para altear um registro no bd
function editarDB(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/orcamentoDespesa", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};