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
    if (pagina < listaComarcas.length / tamanhoPagina - 1) {
        pagina++;
        paginar();
        ajustarBotoes();
    }
}

function controlaBotoes(){
    $('#proxima_pagina').prop('disabled', listaComarcas.length <= tamanhoPagina || pagina > listaComarcas.length / tamanhoPagina - 1);
    $('#pagina_anterior').prop('disabled', listaComarcas.length <= tamanhoPagina || pagina == 0);
}

function paginar() {
    $('#lista_registros_corpo tr').remove();
    
    for (var i = pagina * tamanhoPagina; i < listaComarcas.length && i < (pagina + 1) *  tamanhoPagina; i++) {
        $('#lista_registros_corpo').append(
            '<tr id="linha' + listaComarcas[i]['CodigoComarca'] +'">' +
                '<td>' + listaComarcas[i]['Descricao'] + '</td>' +
                    '<td>'+listaComarcas[i]['Estado']+'</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+listaComarcas[i]['CodigoComarca']+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+listaComarcas[i]['CodigoComarca']+')">Excluir</button>'+
                    '</td>' +
                    '<td hidden>' + listaComarcas[i]['CodigoEstado'] + '</td>' +
                '</tr>'
        );
    }
    controlaBotoes();
}

//objeto que sera manipulado para envio de dados
var comarca = {
    CodigoComarca: null,
    Descricao: "",
    CodigoEstado: null
}

var listaComarcas = [];

//carregando a pagina
$(window).on("load", function(){
    carregaEstados();
    carregaComarcas();
});

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtDescricao').focus();
}); 

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtDescricao').val('');
    $('#selEstado').val(0);
    $('#mensagem').hide();
    $('#formulario').modal('show');
};

//funcao para editar um registro
function editar(id){
    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtCodigo').val(id);
    $('#txtDescricao').val(colunas[0].innerHTML);
    $('#selEstado').val(colunas[3].innerHTML);
    $('#mensagem').hide();
    $('#formulario').modal('show');
};

//funcao para excluir um registro
function excluir(id){
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
    var descricao = $('#txtDescricao').val();
    var codigoEstado = $('#selEstado').val();
    var estado = $('#selEstado option:selected').text();


    //verifica se o campo descricao esta preenchido
    if (descricao === ''){
        $('#mensagem').show();
        $('#txtDescricao').focus();
    }
    else {
        //prepara o objeto a ser gravado
        if (codigo !== '0')
            comarca.CodigoComarca = codigo;
        comarca.Descricao = descricao;
        if (codigoEstado !== '0')
            comarca.CodigoEstado = codigoEstado;
    
        var dados = JSON.stringify(comarca);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);
            
            $('#lista_registros').append(
                '<tr id="linha' + novoCodigo + '">' +
                    '<td>' + descricao + '</td>' +
                    '<td>' + estado + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                    '</td>' +
                    '<td hidden>' + codigoEstado + '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = descricao;
            colunas[1].innerHTML = estado;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/comarca", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/comarca");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/comarca/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar os estados
function carregaEstados(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/estado");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selEstado').append(
                        '<option value="' + data[i].CodigoEstado + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};

//funcao para carregar as comarcas
function carregaComarcas(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/comarca", false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            listaComarcas = data;
            paginar();
        }
    }
    xhr.send();
};