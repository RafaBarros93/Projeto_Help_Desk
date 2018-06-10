//objeto que sera manipulado para envio de dados
var advogado = {
    CodigoAdvogado: null,
    Descricao: "",
    CodigoOAB: null
}

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtDescricao').focus();
}); 

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtDescricao').val('');
    $('#txtCodigoOAB').val('');
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
    $('#txtCodigoOAB').val(colunas[1].innerHTML);
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
    var codigoOAB = $('#txtCodigoOAB').val();

    //verifica se o campo descricao esta preenchido
    if (descricao === ''){
        $('#mensagem').show();
        $('#txtDescricao').focus();
    }
    else {
        //prepara o objeto a ser gravado
        if (codigo !== '0')
            advogado.CodigoAdvogado = codigo;
        advogado.Descricao = descricao;
        if (codigoOAB !== '')
            advogado.CodigoOAB = codigoOAB;
    
        var dados = JSON.stringify(advogado);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);
            
            $('#lista_registros').append(
                '<tr id="linha' + novoCodigo + '">' +
                    '<td>' + descricao + '</td>' +
                    '<td>' + codigoOAB + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                    '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = descricao;
            colunas[1].innerHTML = codigoOAB;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/advogado", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/advogado");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/advogado/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
};