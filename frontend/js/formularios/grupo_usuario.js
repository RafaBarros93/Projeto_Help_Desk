//objeto que sera manipulado para envio de dados
var grupoUsuario = {
    CodigoGrupoUsuario: 0,
    Descricao: "",
    Ativo: "S"
}

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtDescricao').focus();
}); 

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtDescricao').val('');
    $('#chbAtivo').prop('checked', true);
    $('#mensagem').hide();
    desmarcarTodosCheck();
    $('#formulario').modal('show');
};

//funcao para editar um registro
function editar(id){
    //marcar as paginas definidas
    marcarPaginasAcesso(id);

    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtCodigo').val(id);
    $('#txtDescricao').val(colunas[0].innerHTML);
    if (colunas[1].innerHTML === 'Sim')
        $('#chbAtivo').prop('checked', true);
    else
        $('#chbAtivo').prop('checked', false);
    $('#mensagem').hide();

    $('#formulario').modal('show');
};

//funcao para excluir um registro
function excluir(id){
    //limpa os registros do controle de acesso
    limpaControleAcesso(id);
    //deleta o registro
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
    var ativo = 'N';
    if ($('#chbAtivo').is(":checked") == true)
        ativo = 'S';

    //verifica se o campo descricao esta preenchido
    if (descricao === ''){
        $('#mensagem').show();
        $('#txtDescricao').focus();
    }
    else {
        //prepara o objeto a ser gravado
        grupoUsuario.CodigoGrupoUsuario = codigo;
        grupoUsuario.Descricao = descricao;
        grupoUsuario.Ativo = ativo;

        var descricaoAtivo = '';
        if (ativo === 'S')
            descricaoAtivo = 'Sim';
        else
            descricaoAtivo = 'Não';
    
        var dados = JSON.stringify(grupoUsuario);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);

            //grava as paginas de acesso
            var listaChb = document.getElementsByClassName('pull-right');
            for(i = 0; i < listaChb.length; i++){
                if (listaChb[i].checked){
                    var codigoPagina = listaChb[i].id.replace('chb','');
                    var controleAcesso = {
                        CodigoGrupoUsuario: novoCodigo,
                        CodigoPagina: codigoPagina
                    }
                    var dadosAcesso = JSON.stringify(controleAcesso);
                    //grava o controle de acesso
                    gravarControleAcesso(dadosAcesso);
                }
            }
            
            $('#lista_registros').append(
                '<tr id="linha' + novoCodigo + '">' +
                    '<td>' + descricao + '</td>' +
                    '<td>' + descricaoAtivo + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                    '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            //limpa controle de acesso
            limpaControleAcesso(codigo);
            //grava as paginas de acesso
            var listaChb = document.getElementsByClassName('pull-right');
            for(i = 0; i < listaChb.length; i++){
                if (listaChb[i].checked){
                    var codigoPagina = listaChb[i].id.replace('chb','');
                    var controleAcesso = {
                        CodigoGrupoUsuario: codigo,
                        CodigoPagina: codigoPagina
                    }
                    var dadosAcesso = JSON.stringify(controleAcesso);
                    //grava o controle de acesso
                    gravarControleAcesso(dadosAcesso);
                }
            }

            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = descricao;
            colunas[1].innerHTML = descricaoAtivo;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/grupoUsuario", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/grupoUsuario");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/grupoUsuario/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para marca/desmarcar checkbox em um list group
function marcarDesmarcar(id){
	var chb = document.getElementById("chb"+id);
	
	if (chb.checked)
		chb.checked = false
	else
		chb.checked = true;
}

function desmarcarTodosCheck(){
    var listaChb = document.getElementsByClassName('pull-right');
    for(i = 0; i < listaChb.length; i++){
        listaChb[i].checked = false;
    }
}

//funcao para limpar os controles de acesso
function limpaControleAcesso(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/controleAcesso/"+ id, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para gravar os controles de acesso
function gravarControleAcesso(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/controleAcesso");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
};

//funcao para marcar os itens definidos do grupo de usuario
function marcarPaginasAcesso(id){
    desmarcarTodosCheck();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/controleAcesso/"+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                var listaChb = document.getElementsByClassName('pull-right');
                for(j = 0; j < listaChb.length; j++){
                    var codigoPagina = listaChb[j].id.replace('chb','');
                    if (codigoPagina == data[i]['CodigoPagina'])
                        listaChb[j].checked = true;
                }
            }
        }
    }
    xhr.send();
}