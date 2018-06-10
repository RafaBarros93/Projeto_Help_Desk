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
    carregaFiltros();
});

function editarRegistro(indice){
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoLancamento;
    document.getElementById('txtMacroProcesso').value = registros[indice].MacroProcesso;
    document.getElementById('txtEmpresa').value = registros[indice].Empresa;
    document.getElementById('selAvaliacao').value = registros[indice].Avaliacao;
    document.getElementById('txtPergunta').value = registros[indice].Pergunta;
}

function salvarRegistro(){
    let codigo = document.getElementById('txtCodigo').value;
    let avaliacao = document.getElementById('selAvaliacao').value;
    var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));

    registro = {};
    registro.CodigoLancamento = codigo;
    registro.Avaliacao = avaliacao;
    registro.AlteradoPor = cookie.CodigoUsuario; 

    let data = new Date();
    registro.AlteradoEm = data.getFullYear() + '-' + (data.getMonth() +1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() +':00.000';

    let dados = JSON.stringify(registro);

    alterarBD(dados);
}

function preencheTable(){
    let tabela = document.getElementById('lista_corpo');
    tabela.innerHTML = '';
    for(let i in registros){
        tabela.innerHTML += 
        `
        <tr>
            <td>${registros[i].MacroProcesso}</td>
            <td>${registros[i].Empresa}</td>
            <td>${registros[i].Pergunta}</td>
            <td>${registros[i].DescricaoAvaliacao}</td>
            <td style="white-space: nowrap">
                <button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(${i})"></button>&nbsp;
            </td>
        </tr>
        `
    }
}

$('#selEmpresa').on('change', function() {
    if(this.value != ''){
        carregaMacroProcesso(this.value);
    }
});

//funcao para alterar um registro no bd
function alterarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/rfp", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para carregar os registros do bd
function carregaRFP(){
    let empresa = document.getElementById('selEmpresa').value;
    let macroProcesso = document.getElementById('selMacroProcesso').value;

    //salva os filtros
    let filtros = {
        Empresa: empresa,
        MacroProcesso: macroProcesso
    }

    filtros = JSON.stringify(filtros);
    localStorage.setItem('filtros_rfp', filtros);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/rfp/'+macroProcesso+'/'+empresa, false);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}

function carregaEmpresa(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/rfp/empresa', false);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            let empresa = document.getElementById('selEmpresa');
            empresa.innerHTML = '<option value=""></option>';
            for(let i in data){
                empresa.innerHTML += `
                <option value="${data[i].Empresa}">${data[i].Empresa}</option>
                `
            }
        }
    }
    xhr.send();
}

function carregaMacroProcesso(empresa){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/rfp/processos/listar/'+empresa, false);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            let macroProcesso = document.getElementById('selMacroProcesso');
            macroProcesso.innerHTML = '<option value=""></option>';
            for(let i in data){
                macroProcesso.innerHTML += `
                <option value="${data[i].MacroProcesso}">${data[i].MacroProcesso}</option>
                `
            }
        }
    }
    xhr.send();
}

function carregaFiltros(){
    let filtros = localStorage.getItem('filtros_rfp');
    filtros = JSON.parse(filtros);

    carregaEmpresa();
    if (filtros != null){
        document.getElementById('selEmpresa').value = filtros.Empresa;
        carregaMacroProcesso(filtros.Empresa);
        document.getElementById('selMacroProcesso').value = filtros.MacroProcesso;
        carregaRFP();
    }
}