let registros = [];
let registroItens = [];
let processos = [];

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

function novoRegistro(){
    controlaPanel(true);
    document.getElementById('formulario').reset();
    registroItens = [];
    preencheItens();
}

function cancelarRegistro(){ 
    controlaPanel(false);
}


$(window).on("load", function(){
    carregaEstruturaProcesso();
    carregaAcompanhamento();
});

function preencheDadosProcesso(codigo){
    if(codigo != ''){
        //procura o processo informado
        for (let i = 0; i < processos.length; i++){
            if (codigo == processos[i].CODIGO){
                document.getElementById('txtDonoProcesso').value = processos[i].DONOPROCESSO;
                document.getElementById('txtImpactaSapbexs').value = processos[i].ImpactaSapBexs;
                document.getElementById('txtSistema').value = processos[i].SISTEMA;
                document.getElementById('txtAnalista').value = processos[i].Analista;
            }
        }
    }
};

function salvarRegistro(){
    let codigo = document.getElementById('txtCodigo').value;
    let processo = document.getElementById('selProcesso').value;

    let registro = {};
    if(codigo != ''){
        registro.CodigoAcompanhamento = codigo;
    } else {
        //captura o codigo do usuario
        var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
        registro.InseridoPor = cookie.CodigoUsuario; 
    }

    registro.CodigoProcesso = processo;
    registro.Itens = registroItens;

    let dados = JSON.stringify(registro);
    if (codigo == '')
        gravarBD(dados);
    else
        alterarBD(dados);
}

function editarRegistro(indice){
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoAcompanhamento;
    document.getElementById('selProcesso').value = registros[indice].CodigoProcesso;
    document.getElementById('selProcesso').onchange();
    registroItens = registros[indice].Itens;
    preencheItens();
}

function modalItem(){
    document.getElementById('form_item').reset();
    document.getElementById('mensagem_item').hidden = true;
    $('#modal_item').modal('show');
}

function salvarItem(){
    let indiceItem = document.getElementById('txtIndiceItem').value;
    let item = document.getElementById('selItem').value;
    let itemDescricao = document.getElementById("selItem").options[document.getElementById("selItem").selectedIndex].text;
    let dataEntregaPrevista = document.getElementById('txtDataEntregaPrevista').value;
    let dataEntregaReal = document.getElementById('txtDataEntregaReal').value;
    let status = document.getElementById('selStatus').value;
    let statusDescricao = document.getElementById("selStatus").options[document.getElementById("selStatus").selectedIndex].text;
    let responsavel = document.getElementById('txtResponsavel').value;
    //captura o indice do registro pai se estiver em edicao
    let codigoAcompanhamento = document.getElementById('txtCodigo').value;

    //Verifica se os campos obrigatórios foram preenchidos
    if((item == '') || (dataEntregaPrevista == '') || (status == '') || (responsavel == '')){
        document.getElementById('mensagem_item').hidden = false;
    } 
    else { 
        let registro = {};
        registro.Item = item;
        registro.ItemDescricao = itemDescricao;
        registro.DataEntregaPrevista = dataEntregaPrevista;
        if (dataEntregaReal != '')
            registro.DataEntregaReal = dataEntregaReal;
        registro.Status = status;
        registro.StatusDescricao = statusDescricao;
        registro.Responsavel = responsavel;
        if (codigoAcompanhamento != '')
            registro.CodigoAcompanhamento = codigoAcompanhamento;

        if (indiceItem != '')
            registroItens[indiceItem] = registro;
        else 
            registroItens.push(registro);

        $('#modal_item').modal('hide');
        preencheItens();
    }
}

function editarItem(indice){
    document.getElementById('mensagem_item').hidden = true;
    document.getElementById('txtIndiceItem').value = indice;
    document.getElementById('selItem').value = registroItens[indice].Item;
    document.getElementById('txtDataEntregaPrevista').value = registroItens[indice].DataEntregaPrevista;
    document.getElementById('txtDataEntregaReal').value = registroItens[indice].DataEntregaReal;
    document.getElementById('selStatus').value = registroItens[indice].Status;
    document.getElementById('txtResponsavel').value = registroItens[indice].Responsavel;
    $('#modal_item').modal('show');
}

function excluirItem(indice){
    $('#modal_confirmar').modal('hide');
    //verifica se o indice a ser deletado é o ultimo do array de registros
    if (indice === registroItens.length -1){
        registroItens.pop();
    } else if (indice === 0) { //verifica se o indice a ser deletado é o primeiro do array de registros
        registroItens.shift();
    } else { 
        let auxInicio = registroItens.slice(0,indice);
        let auxFim = registroItens.slice(indice+1);
        registroItens = auxInicio.concat(auxFim);
    }
    preencheItens();
}

function exibirConfirmarExcluir(indice, item){
    let mensagem = document.getElementById('mensagem_modal_confirmar');
    mensagem.innerHTML = 'Atenção! Confirma a exclusão do registro?';
    //captura o button de confirmar do modal_confirmar
    let btnModalConfirmar = document.getElementById('btnModalConfirmar');
    //cria o evento onclick
    let onClick = document.createAttribute('onclick');
    //define o evento onclick
    if(item == true)
        onClick.value = 'excluirItem('+indice+')';
    else
        onClick.value = 'excluirRegistro('+indice+')';
    //atribui ao elemento html
    btnModalConfirmar.attributes.setNamedItem(onClick);
    $('#modal_confirmar').modal('show');
}

function excluirRegistro(indice){
    $('#modal_confirmar').modal('hide');
    let codigo = registros[indice].CodigoAcompanhamento;
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

function preencheTable(){
    let tabela = document.getElementById('lista_corpo');
    tabela.innerHTML = '';
    for(let i in registros){
        tabela.innerHTML += 
        `
        <tr>
            <td>${registros[i].Processo}</td>
            <td>${registros[i].DonoProcesso}</td>
            <td>${registros[i].ImpactaSapBexs}</td>
            <td>${registros[i].Sistema}</td>
            <td>${registros[i].Analista}</td>
            <td style="white-space: nowrap">
                <button type="button" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(${i})"></button>&nbsp;
                <button type="button" class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i}, false)"></button>
            </td>
        </tr>
        `
    }
}

function preencheItens(){
    let tabela = document.getElementById('lista_item');
    tabela.innerHTML = '';
    for(let i in registroItens){
        tabela.innerHTML += 
        `
        <tr>
            <td>${registroItens[i].ItemDescricao}</td>
            <td>${formataDataBrasileira(registroItens[i].DataEntregaPrevista)}</td>
            <td>${formataDataBrasileira(registroItens[i].DataEntregaReal)}</td>
            <td>${registroItens[i].StatusDescricao}</td>
            <td>${registroItens[i].Responsavel}</td>
            <td style="white-space: nowrap">
                <button type="button" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarItem(${i})"></button>&nbsp;
                <button type="button" class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i}, true)"></button>
            </td>
        </tr>
        `
    }
}

//funcao para gravar um novo registro no bd
function gravarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/acompanhamento", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para alterar um registro no bd
function alterarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/acompanhamento", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletarBD(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/acompanhamento/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar estrutura processo
function carregaEstruturaProcesso(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/estruturaProcesso');
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            processos = data;
            let selNomeProcesso = document.getElementById('selProcesso');
            selNomeProcesso.innerHTML = '<option value=""></option>';
            for(i in data){
                selNomeProcesso.innerHTML += `<option value="${data[i].CODIGO}">${data[i].CODIGOPROCESSO + ' - ' + data[i].NOMEPROCESSO}</option>`
            }
        }
    }
    xhr.send();
} 

function carregaAcompanhamento(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/acompanhamento', false);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}