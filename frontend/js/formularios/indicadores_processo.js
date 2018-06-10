let registros = [];

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
}

function cancelarRegistro(){ 
    controlaPanel(false);
}

$(window).on("load", function(){
    carregaIndicadoresProcesso();
    carregaEstruturaProcesso();
});

function salvarRegistro(){
    let codigo = document.getElementById('txtCodigo').value;
    let nomeProcesso = document.getElementById('selNomeProcesso').value;
    let gestor = document.getElementById('txtGestor').value;
    let indicador = document.getElementById('txtIndicador').value;
    let objetivo = document.getElementById('txtObjetivo').value;
    let unidadeMedida = document.getElementById('txtUnidadeMedida').value;
    let formulaCalculo = document.getElementById('txtFormulaCalculo').value;
    let meta = document.getElementById('txtMeta').value;
    let polaridadeTolerancia = document.getElementById('txtPolaridadeTolerancia').value;
    let frequenciaMedicao = document.getElementById('txtFrequenciaMedicao').value;
    let fonteDados = document.getElementById('txtFonteDados').value;
    let responsavel = document.getElementById('txtResponsavel').value;
    let partesInteressadas = document.getElementById('txtPartesInteressadas').value;
    let analiseFinalResultado = document.getElementById('txtAnaliseFinalResultado').value;

    let registro = {};
    if(codigo != ''){
        registro.CodigoIndicador = codigo;
    } else {
        //captura o codigo do usuario
        var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
        registro.InseridoPor = cookie.CodigoUsuario; 
    }

    registro.CodigoEstruturaProcesso = nomeProcesso;
    registro.Gestor = gestor;
    registro.Indicador = indicador;
    registro.Objetivo = objetivo;
    registro.UnidadeMedida = unidadeMedida;
    registro.FormulaCalculo = formulaCalculo;
    registro.Meta = meta;
    registro.PolaridadeTolerancia = polaridadeTolerancia;
    registro.FrequenciaMedicao = frequenciaMedicao;
    registro.FonteDados = fonteDados;
    registro.Responsavel = responsavel;
    registro.PartesInteressadas = partesInteressadas;
    registro.AnaliseFinalResultado = analiseFinalResultado;

    let dados = JSON.stringify(registro);
    if (codigo == '')
        gravarBD(dados);
    else
        alterarBD(dados);
}

function editarRegistro(indice){
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoIndicador;
    document.getElementById('selNomeProcesso').value = registros[indice].CodigoEstruturaProcesso;
    document.getElementById('txtGestor').value = registros[indice].Gestor;
    document.getElementById('txtIndicador').value = registros[indice].Indicador;
    document.getElementById('txtObjetivo').value = registros[indice].Objetivo;
    document.getElementById('txtUnidadeMedida').value = registros[indice].UnidadeMedida;
    document.getElementById('txtFormulaCalculo').value = registros[indice].FormulaCalculo;
    document.getElementById('txtMeta').value = registros[indice].Meta;
    document.getElementById('txtPolaridadeTolerancia').value = registros[indice].PolaridadeTolerancia;
    document.getElementById('txtFrequenciaMedicao').value = registros[indice].FrequenciaMedicao;
    document.getElementById('txtFonteDados').value = registros[indice].FonteDados;
    document.getElementById('txtResponsavel').value = registros[indice].Responsavel;
    document.getElementById('txtPartesInteressadas').value = registros[indice].PartesInteressadas;
    document.getElementById('txtAnaliseFinalResultado').value = registros[indice].AnaliseFinalResultado;
}

function exibirConfirmarExcluir(indice){
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

function excluirRegistro(indice){
    $('#modal_confirmar').modal('hide');
    let codigo = registros[indice].CodigoIndicador;
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
            <td>${registros[i].Gestor}</td>
            <td>${registros[i].Indicador}</td>
            <td>${registros[i].Responsavel}</td>
            <td style="white-space: nowrap">
                <button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(${i})"></button>&nbsp;
                <button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i})"></button>
            </td>
        </tr>
        `
    }
}

//funcao para carregar os registros do bd
function carregaIndicadoresProcesso(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/indicadoresProcesso', false);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}

//funcao para gravar um novo registro no bd
function gravarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/indicadoresProcesso", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/indicadoresProcesso", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletarBD(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/indicadoresProcesso/"+ id);
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
            let selNomeProcesso = document.getElementById('selNomeProcesso');
            selNomeProcesso.innerHTML = '<option value=""></option>';
            for(i in data){
                if (data[i].CODIGO != 129)
                    selNomeProcesso.innerHTML += `<option value="${data[i].CODIGO}">${data[i].CODIGOPROCESSO + ' - ' + data[i].NOMEPROCESSO}</option>`
            }
        }
    }
    xhr.send();
} 