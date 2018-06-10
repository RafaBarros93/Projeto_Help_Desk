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
    carregaAtividadeCalendarioContabil();
});

function salvarRegistro() {
    let codigo = document.getElementById('txtCodigo').value;
    let descricao = document.getElementById('txtDescricao').value;
    let tipo = document.getElementById('selTipo').value;
    let data = document.getElementById('txtData').value;

    let registro = {};
    if (codigo != '') {
        registro.CodigoAtividade = codigo;
    } else {
        //captura o codigo do usuario
        var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
        registro.InseridoPor = cookie.CodigoUsuario;
    }
    registro.Descricao = descricao;
    registro.Data = data;
    registro.Tipo = tipo;

    let dados = JSON.stringify(registro);
    if (codigo == '')
        gravarBD(dados);
    else
        alterarBD(dados);
}

function editarRegistro(indice) {
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoAtividade;
    document.getElementById('txtDescricao').value = registros[indice].Descricao;
    document.getElementById('selTipo').value = registros[indice].Tipo;
    document.getElementById('txtData').value = registros[indice].Data;
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
    let codigo = registros[indice].CodigoAtividade;
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
            <td>${registros[i].Descricao}</td>
            <td>${registros[i].DescricaoTipo}</td>
            <td>${formataDataBrasileira(registros[i].Data)}</td>
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
    xhr.open("POST", BASE_URL_SERVICO + "/atividadeCalendarioContabil", false); //realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/atividadeCalendarioContabil", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletarBD(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/atividadeCalendarioContabil/" + id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar os registros do bd
function carregaAtividadeCalendarioContabil() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/atividadeCalendarioContabil', false);
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}