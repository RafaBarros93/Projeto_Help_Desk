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

function salvarRegistro(){
    let codigoProposta = document.getElementById('txtCodigo').value;
    let empreendimento = document.getElementById('selEmpreendimento').value;
    let fornecedor = document.getElementById('selFornecedor').value;
    let materialServico = document.getElementById('selMaterialServico').value;
    let peso = document.getElementById('txtPesoMaterial').value;
    let valorMaterial = document.getElementById('txtValorMaterial').value;
    let valorMaoDeObra = document.getElementById('txtMaoDeObra').value;
    valorMaterial = removeMascaraValor(valorMaterial);
    valorMaterial = valorMaterial.replace('R$ ', '');
    valorMaoDeObra = removeMascaraValor(valorMaoDeObra);
    valorMaoDeObra = valorMaoDeObra.replace('R$ ','');
    let naoSeAplica;
    if (document.getElementById('chbNaoSeAplica').checked){
        naoSeAplica = 'S'
    } else {
        naoSeAplica = 'N';
    }

    let registro = {};
    if (codigoProposta != '')
        registro.CodigoProposta = codigoProposta;
    registro.CodigoEmpreendimento = empreendimento;
    registro.CodigoFornecedor = fornecedor;
    registro.CodigoMaterialServico = materialServico;
    registro.Peso = peso;
    registro.ValorMaterial = valorMaterial;
    registro.ValorMaoDeObra = valorMaoDeObra;
    registro.NaoSeAplica = naoSeAplica;
    registro.Escolhida = 'N';
    registro.Validada = 'N';

    let dados = JSON.stringify(registro);
    if (codigoProposta == '')
        gravarBD(dados);
    else
        alterarBD(dados);
}

function editarRegistro(indice){
    controlaPanel(true);
    document.getElementById('txtCodigo').value = registros[indice].CodigoProposta;
    document.getElementById('selEmpreendimento').value = registros[indice].CodigoObraDepartamento;
    document.getElementById('selFornecedor').value = registros[indice].CodigoFornecedor;
    document.getElementById('selMaterialServico').value = registros[indice].CodigoMaterial;
    document.getElementById('txtPesoMaterial').value = registros[indice].Peso;
    document.getElementById('txtValorMaterial').value = formatValor(registros[indice].ValorMaterial, 'R$ ');
    document.getElementById('txtMaoDeObra').value = formatValor(registros[indice].ValorMaoDeObra, 'R$ ');
    if(registros[indice].NaoSeAplica == 'S')
        document.getElementById('chbNaoSeAplica').checked = true;
    else
        document.getElementById('chbNaoSeAplica').checked = false;
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
    let codigo = registros[indice].CodigoProposta;
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
                <td>${registros[i].Empreendimento}</td>
                <td>${registros[i].Fornecedor}</td>
                <td>${registros[i].Material}</td>
                <td>${formatValor(registros[i].ValorTotal, 'R$ ')}</td>
                <td>${formataDataBrasileira(registros[i].Data)}</td>
                <td style="white-space: nowrap">
                    <button class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarRegistro(${i})"></button>&nbsp;
                    <button class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i})"></button>
                </td>
            </tr>
        `;
    }
}

function carregaEmpreendimento(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/obraDepartamento');
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selEmpreendimento').innerHTML = '';
            document.getElementById('selFiltroEmpreendimento').innerHTML = '';
            $('#selEmpreendimento').append(`<option value=""></option>`);
            $('#selFiltroEmpreendimento').append(`<option value="0"></option>`);
            for(let x in data){
                $('#selEmpreendimento').append(`<option value="${data[x].CodigoObraDepartamento}">${data[x].Descricao}</option>`);
                $('#selFiltroEmpreendimento').append(`<option value="${data[x].CodigoObraDepartamento}">${data[x].Descricao}</option>`);
            }
        }
    }
    xhr.send();
}

function carregaFornecedor(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/fornecedor');
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selFornecedor').innerHTML = '';
            document.getElementById('selFiltroFornecedor').innerHTML = '';
            $('#selFornecedor').append(`<option value=""></option>`);
            $('#selFiltroFornecedor').append(`<option value="0"></option>`);
            for(let x in data){
                $('#selFornecedor').append(`<option value="${data[x].CodigoFornecedor}">${data[x].Nome}</option>`);
                $('#selFiltroFornecedor').append(`<option value="${data[x].CodigoFornecedor}">${data[x].Nome}</option>`);
            }
        }
    }
    xhr.send();
}

function carregaMaterial(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/material');
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selMaterialServico').innerHTML = '';
            document.getElementById('selFiltroMaterialServico').innerHTML = '';
            $('#selMaterialServico').append(`<option value=""></option>`);
            $('#selFiltroMaterialServico').append(`<option value="0"></option>`);
            for(let x in data){
                $('#selMaterialServico').append(`<option value="${data[x].Nome}">${data[x].Descricao}</option>`);
                $('#selFiltroMaterialServico').append(`<option value="${data[x].Nome}">${data[x].Descricao}</option>`);
            }
        }
    }
    xhr.send();
}

function carregaPropostas(empreendimento, fornecedor, material, valor){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/propostaTecnica/'+empreendimento +'/'+fornecedor +'/'+ material+'/'+valor);
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            registros = data;
            preencheTable();
        }
    }
    xhr.send();
}

$(window).on("load", function(){
    carregaEmpreendimento();
    carregaFornecedor();
    carregaMaterial();
});

//funcao para gravar um novo registro no bd
function gravarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/propostaTecnica", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/propostaTecnica");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletarBD(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/propostaTecnica/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function listarRegistros(){
    let empreendimento = document.getElementById('selFiltroEmpreendimento').value;
    let fornecedor = document.getElementById('selFiltroFornecedor').value
    let material = document.getElementById('selFiltroMaterialServico').value;
    let valor = document.getElementById('selFiltroValor').value;
    carregaPropostas(empreendimento, fornecedor, material, valor);
}