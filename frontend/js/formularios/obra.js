//objeto que sera manipulado para envio de dados
var obra = {
    CodigoObraDepartamento: 0,
    Descricao: "",
    PercentualPatrimar: 0
}

//seta o campo Descricao apos a exibicao do modal
$('#formulario').on('shown.bs.modal', function () {
    $('#txtDescricao').focus();
}); 

$('#txtPatrimar').on('change', function() {
    var valor = removeMascara($('#txtPatrimar').val(), '% ');
    valor = parseFloat(valor);
    if (valor >= 100){
        $('#txtPatrimar').val('% 100,00');
    }
});

//funcao para inserir um novo registro
function inserir(){
    $('#txtCodigo').val(0);
    $('#txtDescricao').val('');
    $('#txtPatrimar').val('% 0,00');
    $('#txtMetroQuadrado').val();
    $('#selTipologia').val(0);
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
    $('#txtPatrimar').val(colunas[1].innerHTML);
    $('#txtMetroQuadrado').val(colunas[3].innerHTML);
    $('#selTipologia').val(colunas[4].innerHTML);
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
    var percPatrimar = parseFloat(removeMascara($('#txtPatrimar').val(), '% '));
    var metroQuadrado = $('#txtMetroQuadrado').val();
    var tipologia = $('#selTipologia').val();

    //verifica se o campo descricao esta preenchido
    if ((descricao === '') || (percPatrimar > 100)) {
        $('#mensagem').show();
        $('#txtDescricao').focus();
    }
    else {
        //prepara o objeto a ser gravado
        obra.CodigoObraDepartamento = codigo;
        obra.Descricao = descricao;
        obra.PercentualPatrimar = percPatrimar;
        if(metroQuadrado != '')
            obra.MetroQuadrado = metroQuadrado;
        else 
            obra.MetroQuadrado = 0;
        if(tipologia != '0')
            obra.Tipologia = tipologia
        else
            obra.Tipologia = null;
    
        var dados = JSON.stringify(obra);

        //verifica se é uma edicao
        if(codigo == 0){
            //var novoCodigo = $('#lista_registros tbody tr').length + 1;
            var novoCodigo = gravar(dados);
            
            $('#lista_registros').append(
                '<tr id="linha' + novoCodigo + '">' +
                    '<td>' + descricao + '</td>' +
                    '<td>' + formatValor(percPatrimar, '% ') + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-xs" onclick="editar('+novoCodigo+')">Editar</button>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" onclick="excluir('+novoCodigo+')">Excluir</button>' +
                    '</td>' +
                    '<td hidden>' + metroQuadrado + '</td>' +
                    '<td hidden>' + tipologia + '</td>' +
                '</tr>'
            );
        }
        else {
            alterar(dados);
            var linha = document.getElementById("linha"+codigo);
            var colunas = linha.getElementsByTagName('td');
            colunas[0].innerHTML = descricao;
            colunas[1].innerHTML = formatValor(percPatrimar, '% ');
            colunas[3].innerHTML = metroQuadrado;
            colunas[4].innerHTML = tipologia;
        }
        $('#formulario').modal('hide');
    }
};

//funcao para gravar um novo registro no bd
function gravar(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/obraDepartamento", false);//realiza uma chamada sincrona para receber o id gerado
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
    xhr.open("PUT", BASE_URL_SERVICO + "/obraDepartamento");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
}

//funcao para deletar um registro no bd
function deletar(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/obraDepartamento/"+ id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}