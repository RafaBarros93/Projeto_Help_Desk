//objeto que sera manipulado para envio de dados
var pagina = {
    CodigoPagina: 0,
    Nome: "",
    Arquivo: "",
    Ativo: "S",
    CodigoMenu: null,
    CodigoDashboard: null
}

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtNome').focus();
}); 

//carregando a pagina
$(window).on("load", function(){
    carregaMenu();
    carregaDashboard();

    $('#selDashboard').on('change', function() {
        if (this.value !== '0'){
            $('#txtNome').val($('#selDashboard option:selected').text());
            $('#txtArquivo').val('dashboard.php?id='+this.value);
        } 
    });
});

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtNome').val('');
    $('#txtArquivo').val('');
    $('#selMenu').val(0);
    $('#selDashboard').val(0);
    $('#chbAtivo').prop('checked', true);
    $('#mensagem').hide();
    $('#formulario').modal('show');
};

//funcao para editar um registro
function editar(id){
    //captura a linha informada
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    $('#txtCodigo').val(id);
    $('#txtNome').val(colunas[0].innerHTML);
    $('#txtArquivo').val(colunas[1].innerHTML);
    if (colunas[2].innerHTML === 'Sim')
        $('#chbAtivo').prop('checked', true);
    else
        $('#chbAtivo').prop('checked', false);
    $('#selMenu').val(colunas[4].innerHTML);
    $('#selDashboard').val(colunas[5].innerHTML);
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
    var nome = $('#txtNome').val();
    var arquivo = $('#txtArquivo').val();
    var menu = $('#selMenu').val();
    var dashboard = $('#selDashboard').val();
    var ativo = 'N';
    if ($('#chbAtivo').is(":checked") == true)
        ativo = 'S';

    //verifica se o campo descricao esta preenchido
    if ((nome === '') || (arquivo === '')) {
        $('#mensagem').show();
        $('#txtNome').focus();
    }
    else {
        //prepara o objeto a ser gravado
        pagina.CodigoPagina = codigo;
        pagina.Nome = nome;
        pagina.Arquivo = arquivo;
        pagina.Ativo = ativo;
        if(menu !== '0')
            pagina.CodigoMenu = menu;
        if(dashboard !== '0')
            pagina.CodigoDashboard = dashboard;

        var descricaoAtivo = '';
        if (ativo === 'S')
            descricaoAtivo = 'Sim';
        else
            descricaoAtivo = 'Não';
    
        var dados = JSON.stringify(pagina);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);
            
            $('#lista_registros').append(
                '<tr id="linha' + novoCodigo + '">' +
                    '<td>' + nome + '</td>' +
                    '<td>' + arquivo + '</td>' +
                    '<td>' + descricaoAtivo + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                    '</td>' +
                    '<td hidden>' + menu + '</td>' +
                    '<td hidden>' + dashboard + '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = nome;
            colunas[1].innerHTML = arquivo;
            colunas[2].innerHTML = descricaoAtivo;
            colunas[4].innerHTML = menu;
            colunas[5].innerHTML = dashboard;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/pagina", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/pagina");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/pagina/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

//funcao para carregar os menus
function carregaMenu(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/menu");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;

            for(i = 0; i < data.length; i++){
                $('#selMenu').append(
                        '<option value="' + data[i].CodigoMenu + '">' + data[i].Descricao + '</option>'
                );
            }
        }
    }
    xhr.send();
}

//funcao para carregar os dashboards
function carregaDashboard(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/dashboards");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selDashboard').append(
                        '<option value="' + data[i].CodigoDashboard + '">' + data[i].Nome + '</option>'
                );
            }
        }
    }
    xhr.send();
}