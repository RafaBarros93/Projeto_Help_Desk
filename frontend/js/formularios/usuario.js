//objeto que sera manipulado para envio de dados
var usuario = {
    CodigoUsuario: 0,
    Nome: "",
    Email: "",
    Senha: "",
    CodigoGrupoUsuario: 0,
    Ativo: "S",
    VisualizarTodosProcessos: "N"
}

//carregando a pagina
$(window).on("load", function(){
    carregaGrupoUsuario();
});

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtNome').focus();
}); 

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtNome').val('');
    $('#txtEmail').val('');
    $('#txtSenha').val('');
    $('#txtConfirmarSenha').val('');
    $('#selGrupoUsuario').val(0);
    $('#chbAtivo').prop('checked', true);
    $('#chbVisualizarTodosProcessos').prop('checked', false);
    $('#mensagem').hide();
    $('#mensagemSenha').hide();
    $('#formulario').modal('show');
};

//funcao para editar um registro
function editar(id){
    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtCodigo').val(id);
    $('#txtSenha').val('');
    $('#txtConfirmarSenha').val('');
    $('#txtNome').val(colunas[0].innerHTML);
    $('#txtEmail').val(colunas[1].innerHTML);
    $('#selGrupoUsuario').val(colunas[5].innerHTML);
    if (colunas[3].innerHTML === 'Sim')
        $('#chbAtivo').prop('checked', true);
    else
        $('#chbAtivo').prop('checked', false);
    if (colunas[6].innerHTML === 'S')
        $('#chbVisualizarTodosProcessos').prop('checked', true);
    else
        $('#chbVisualizarTodosProcessos').prop('checked', false);
    $('#mensagem').hide();
    $('#mensagemSenha').hide();
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
    $('#mensagem').hide();
    $('#mensagemSenha').hide();
    //le os campos do formulario
    var codigo = $('#txtCodigo').val();
    var nome = $('#txtNome').val();
    var email = $('#txtEmail').val();
    var senha = $('#txtSenha').val();
    var senhaConfirmacao = $('#txtConfirmarSenha').val();
    var codigoGrupoUsuario = $('#selGrupoUsuario').val();
    var grupoUsuario = $('#selGrupoUsuario option:selected').text();
    var ativo = 'N';
    var visualizarTodosProcessos = 'N';
    if ($('#chbAtivo').is(":checked") == true)
        ativo = 'S';
    if ($('#chbVisualizarTodosProcessos').is(":checked") == true)
        visualizarTodosProcessos = 'S';

    //verifica se o campo descricao esta preenchido
    if ((nome === '') || (email === '') || (senha === '') || (codigoGrupoUsuario === '0')) {
        $('#mensagem').show();
        $('#txtNome').focus();
    }
    else {
        if (senha !== senhaConfirmacao) {
            $('#mensagemSenha').show(); 
        }
        else {
            //prepara o objeto a ser gravado
            usuario.CodigoUsuario = codigo;
            usuario.Nome = nome;
            usuario.Email = email;
            usuario.Senha = senha;
            usuario.CodigoGrupoUsuario = codigoGrupoUsuario;
            usuario.Ativo = ativo;
            usuario.VisualizarTodosProcessos = visualizarTodosProcessos;

            var descricaoAtivo = '';
            if (ativo === 'S')
                descricaoAtivo = 'Sim';
            else
                descricaoAtivo = 'Não';
        
            var dados = JSON.stringify(usuario);

            //verifica se é uma edicao
            if(codigo == 0){
                //var novoCodigo = $('#lista_registros tbody tr').length + 1;
                var novoCodigo = gravar(dados);
                
                $('#lista_registros').append(
                    '<tr id="linha' + novoCodigo + '">' +
                        '<td>' + nome + '</td>' +
                        '<td>' + email + '</td>' +
                        '<td>' + grupoUsuario + '</td>' +
                        '<td>' + descricaoAtivo + '</td>' +
                        '<td>' +
                            '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                            '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                        '</td>' +
                        '<td hidden>' + codigoGrupoUsuario + '</td>' +
                        '<td hidden>' + visualizarTodosProcessos + '</td>' +
                    '</tr>'
                );
            }
            else {
                alterar(dados);
                var linha = document.getElementById("linha"+codigo);
                var colunas = linha.getElementsByTagName('td');
                colunas[0].innerHTML = nome;
                colunas[1].innerHTML = email;
                colunas[2].innerHTML = grupoUsuario;
                colunas[3].innerHTML = descricaoAtivo;
                colunas[6].innerHTML = visualizarTodosProcessos;
            }
            $('#formulario').modal('hide');    
        } 
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/usuario", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/usuario");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/usuario/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar os estados
function carregaGrupoUsuario(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/grupoUsuario");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selGrupoUsuario').append(
                        '<option value="' + data[i].CodigoGrupoUsuario + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
};