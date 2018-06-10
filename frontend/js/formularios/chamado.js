let registros = [];

function controlaPanel(exibeFormulario) {
    if (exibeFormulario) {
        $('#formulario').show();
        $('#lista').hide();
        $('#filtros').hide();
    } else {
        $('#formulario').hide();
        $('#lista').show();
        $('#filtros').show();
    }
}

function novoRegistro() {
    controlaPanel(true);
    document.getElementById('formulario').reset();
}

function cancelarRegistro() {
    controlaPanel(false);
}


$(window).on("load", function () {
    carregaChamado();
    carregaCategoria();
});

function salvarRegistro() {
    let codigo = document.getElementById('txtCodigo').value;
    let titulo = document.getElementById('txtTitulo').value;
    let codigoCategoria = document.getElementById('selCategoria').value;
    let responsavel = document.getElementById('txtResponsavel').value;
    let localizacao = document.getElementById('txtLocalizacao').value;
    let dataInicio = formataData(document.getElementById('txtDataInicio').value);
    let dataFim = formataData(document.getElementById('txtDataFim').value);
    let status = document.getElementById('selStatus').value;
    let statusPrioridade = document.getElementById('selStatusPrioridade').value;
    let observacao = document.getElementById('txtObservacao').value;

    let registro = {};
    if (codigo != '') {
        registro.CodigoChamado = codigo;
    } else {
        //captura o codigo do usuario
        var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
        registro.InseridoPor = cookie.CodigoUsuario;
    }
    registro.Titulo = titulo;
    registro.Codigo = codigoCategoria;
    registro.Responsavel = responsavel;
    registro.Localizacao = localizacao;
    registro.DataInicio = dataInicio;
    registro.DataFim = dataFim;
    registro.Status = status;
    registro.Prioridade = statusPrioridade;
    registro.Observacao = observacao;

    let dados = JSON.stringify(registro);
    if (codigo == '')
        gravarBD(dados);
    else
        alterarBD(dados);
}

function editarRegistro(indice) {
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoChamado;
    document.getElementById('txtTitulo').value = registros[indice].Titulo;
    document.getElementById('selCategoria').value = registros[indice].Codigo;
    document.getElementById('txtResponsavel').value = registros[indice].Responsavel;
    document.getElementById('txtLocalizacao').value = registros[indice].Localizacao;
    document.getElementById('txtDataInicio').value = formataDataBrasileira(registros[indice].DataInicio);
    document.getElementById('txtDataFim').value = formataDataBrasileira(registros[indice].DataFim);
    document.getElementById('selStatus').value = registros[indice].Status;
    document.getElementById('selStatusPrioridade').value = registros[indice].Prioridade;
    document.getElementById('txtObservacao').value = registros[indice].Observacao;
}

function exibirConfirmarExcluir(indice) {
    let mensagem = document.getElementById('mensagem_modal_confirmar');
    mensagem.innerHTML = 'Atenção! Confirma a exclusão do registro?';
    //captura o button de confirmar do modal_confirmar
    let btnModalConfirmar = document.getElementById('btnModalConfirmar');
    //cria o evento onclick
    let onClick = document.createAttribute('onclick');
    //define o evento onclick
    onClick.value = 'excluirRegistro(' + indice + ')';
    //atribui ao elemento html
    btnModalConfirmar.attributes.setNamedItem(onClick);
    $('#modal_confirmar').modal('show');
}

function excluirRegistro(indice) {
    $('#modal_confirmar').modal('hide');
    let codigo = registros[indice].CodigoChamado;
    deletarBD(codigo);
    //verifica se o indice a ser deletado é o ultimo do array de registros
    if (indice === registros.length - 1) {
        registros.pop();
    } else if (indice === 0) { //verifica se o indice a ser deletado é o primeiro do array de registros
        registros.shift();
    } else {
        let auxInicio = registros.slice(0, indice);
        let auxFim = registros.slice(indice + 1);
        registros = auxInicio.concat(auxFim);
    }
    preencheTable();
}

function preencheTable() {
    let tabela = document.getElementById('lista_corpo');
    tabela.innerHTML = '';
    for (let i in registros) {
        tabela.innerHTML +=
            `
        <tr>
            <td>${registros[i].Titulo}</td>
            <td>${registros[i].DescicaoCategoria}</td>
            <td>${registros[i].Responsavel}</td>
            <td>${registros[i].Localizacao}</td>
            <td>${formataDataBrasileira(registros[i].DataInicio)}</td>
            <td>${formataDataBrasileira(registros[i].DataFim)}</td>
            <td>${registros[i].StatusDescricao}</td>
            <td>${registros[i].StatusPrioridade}</td>
            <td style="white-space: nowrap">
                <button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(${i})"></button>&nbsp;
                <button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i})"></button>
            </td>
        </tr>
        `
    }
}

//funcao para gravar um novo registro no bd
function gravarBD(dados) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/chamado", false); //realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if (xhr.status === 200) {
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para alterar um registro no bd
function alterarBD(dados) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/chamado", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletarBD(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/chamado/" + id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar os registros do bd
function carregaChamado() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/chamado', false);
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}

//funcao para carregar estrutura processo
function carregaCategoria() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/categoria');
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = $.parseJSON(xhr.responseText).result;
            let selCategoria = document.getElementById('selCategoria');
            selCategoria.innerHTML = '<option value=""></option>';
            for (i in data) {
                selCategoria.innerHTML += `<option value="${data[i].Codigo}">${data[i].DescicaoCategoria}</option>`
               
            }
        }
    }
    xhr.send();
}

function printData(id) {      
   let html = `
            <center><strong>Sistema Help Desk</strong></center> 
            <br>
            
       
        ${$('#'+id)[0].outerHTML}
   `;
   newWin= window.open("");
   newWin.document.write(html);
   newWin.print();
   newWin.close();
}