//carregando a pagina
$(window).on("load", function(){
    carregaColigadas();
    carregaDiretorias();
    carregaCentroCusto();
    carregaCargos();
});

//funcao para carregar as coligadas
function carregaColigadas(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/coligadas");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selColigada').append(
                        '<option>' + data[i].Nome + '</option>'
                );
                $('#selNovoColigada').append(
                    '<option>' + data[i].Nome + '</option>'
                );
            }
        }
    }
    xhr.send();
}

//funcao para carregar diretorias
function carregaDiretorias(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/diretorias");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selDiretoria').append(
                        '<option>' + data[i].Diretoria + '</option>'
                );
                $('#selNovoDiretoria').append(
                    '<option>' + data[i].Diretoria + '</option>'
                );
            }
        }
    }
    xhr.send();
}

//funcao para carregar centroCusto
function carregaCentroCusto(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/centroCustos");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selCentroCusto').append(
                        '<option>' + data[i].CentroCusto + '</option>'
                );
                $('#selNovoCentroCusto').append(
                    '<option>' + data[i].CentroCusto + '</option>'
            );
            }
        }
    }
    xhr.send();
}

//funcao para carregar cargos
function carregaCargos(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/cargos");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selCargo').append(
                        '<option>' + data[i].Cargo + '</option>'
                );
                $('#selNovoCargo').append(
                    '<option>' + data[i].Cargo + '</option>'
            );
            }
        }
    }
    xhr.send();
}

//funcao para carregar cargos
function carregaStatus(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/funcionarioStatus");
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                $('#selStatus').append(
                        '<option>' + data[i].Status + '</option>'
                );
                $('#selNovoStatus').append(
                    '<option>' + data[i].Status + '</option>'
            );
            }
        }
    }
    xhr.send();
}

//Ação para criar um novo funcionário
function novoFuncionario(){
    $('#txtNovoNome').val('NOVO COLABORADOR');
    $('#txtNovoColigada').val('');
    $('#txtNovoDiretoria').val('');
    $('#txtNovoCentroCusto').val('');
    $('#txtNovoCargo').val('');
    $('#txtNovoStatus').val('');
    $('#txtNovoSalario').val('R$ 0,00');
    $('#txtNovoDataAdmissao').val('');
    //chama o formulario modal
    $('#novo_funcionario').modal('show');
};

function removeMascaraMoeda(texto){
    var dado = texto.replace("R$ ", "").replace(".","").replace(",",".");
    return dado;
};

function gravarFuncionario(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/funcionarios");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
};

function alterarFuncionario(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/funcionarios");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
};

function deletarNovoFuncionario(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", BASE_URL_SERVICO + "/funcionarios");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
};

//Ação para salvar novo funcionario
function salvarNovoFuncionario(){
    var nome = $('#txtNovoNome').val();
    var coligada = $('#selNovoColigada').val();
    // var diretoria = $('#selNovoDiretoria').val();
    var centroCusto = $('#selNovoCentroCusto').val();
    var cargo = $('#selNovoCargo').val();
    var status = $('#selNovoStatus').val();
    var salario = $('#txtNovoSalario').val();
    var dataAdmissao = $('#txtNovoDataAdmissao').val();
  
    var funcionario = {
        Nome: "",
        Coligada: "",
        Diretoria: "",
        CentroCusto: "",
        Cargo: "",
        Status: "",
        Salario: 0,
        DataAdmissao: "",
        DataSalario: "",
        DataDemissao: "" 
    };

    funcionario.Nome = nome;
    funcionario.Coligada = coligada;
    funcionario.Diretoria = '';
    funcionario.CentroCusto = centroCusto;
    funcionario.Cargo = cargo;
    funcionario.Status = status;
    funcionario.Salario = removeMascaraMoeda(salario);

    if(dataAdmissao != ''){
        var dia = dataAdmissao.substr(0,2);
        var mes = dataAdmissao.substr(3,2);
        var ano = dataAdmissao.substr(6,4);
        funcionario.DataAdmissao = ano + '-' + mes + '-' + dia;
    } else {
        funcionario.DataAdmissao = '';
    }

    var dados = JSON.stringify(funcionario);

    gravarFuncionario(dados);

    //verifica o proximo id da tabela de listar funcionarios
    var id = $('#lista-funcionarios tbody tr').length + 1;
    //Adiciona a nova linha na tabela
    $('#lista-funcionarios').append(
        '<tr id="linha' + id + '">' +
            '<td>' + coligada + '</td>' +
            // '<td></td>' +
            '<td>' + nome + '</td>' +
            '<td>' + dataAdmissao + '</td>' +
            '<td>' + salario + '</td>' +
            '<td>' + centroCusto + '</td>' +
            // '<td>' + diretoria + '</td>' +
            '<td>' + cargo + '</td>' +
            '<td>' + status + '</td>' +
            '<td></td>' +
            '<td style="white-space: nowrap">' +
            '<button class="btn btn-primary btn-xs" onclick="editarFuncionario('+id+')">Editar</button>'+
            '<button class="btn btn-danger btn-xs" onclick="deletarFuncionario('+id+')">Excluir</button>'+
            '</td>' +
            '<td hidden></td>' +
            '<td hidden>'+id+'</td>' +
            '<td hidden></td>' +
        '</tr>'
    );
    //fecha o modal
    $('#novo_funcionario').modal('hide');
};

//Acao de editar o funcionario
function editarFuncionario(id){
    //var id = $(this).data('id');
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');
    //passa os valores para o formulario modal
    $('#txtCodigoID').val(id);
    // $('#txtMatricula').val(colunas[1].innerHTML);
    $('#txtNome').val(colunas[1].innerHTML);
    $('#txtDataAdmissao').val(colunas[2].innerHTML);
    $('#selColigada').val(colunas[0].innerHTML);
    // $('#selDiretoria').val(colunas[5].innerHTML);
    $('#selCentroCusto').val(colunas[4].innerHTML);
    $('#selCargo').val(colunas[5].innerHTML);
    $('#selStatus').val(colunas[6].innerHTML);
    if(colunas[9].innerHTML != ''){
        $('#txtDataAlteracaoSalario').val(colunas[9].innerHTML);
    }
    else {
        $('#txtDataAlteracaoSalario').val('');
    }
    $('#txtSalario').val(colunas[3].innerHTML);
    if(colunas[7].innerHTML != '') {
        $('#txtDataDemissao').val(colunas[7].innerHTML);
    } 
    else {
        $('#txtDataDemissao').val('');
    } 
    $('#txtAumentoSalario2').val(colunas[11].innerHTML);
    if(colunas[12].innerHTML != '') {
        $('#txtDataAlteracaoSalario2').val(colunas[12].innerHTML);
    } 
    else {
        $('#txtDataAlteracaoSalario2').val('');
    } 
    $('#txtSalarioAtual').val(colunas[13].innerHTML);
    $('#editar_funcionario').modal('show');
};

//Ação para deletar um novo colaborador
function deletarFuncionario(id){
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    if (colunas[10] != ''){
        var funcionario = {
            CPF: colunas[10].innerHTML
        }
        var dados = JSON.stringify(funcionario);
        deletarNovoFuncionario(dados);
        linha.remove(); 
    }
};

//Acao de salvar a edicao do funcionario
function salvarEdicaoFuncionario(){
    var id = $('#txtCodigoID').val();
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');

    // var martricula = $('#txtMatricula').val();
    var nome = $('#txtNome').val();
    var coligada = $('#selColigada').val();
    // var diretoria = $('#selDiretoria').val();
    var centroCusto = $('#selCentroCusto').val();
    var cargo = $('#selCargo').val();
    var status = $('#selStatus').val();
    var salario = $('#txtSalario').val();
    var dataAlteracaoSalario = $('#txtDataAlteracaoSalario').val();
    var dataDemissao = $('#txtDataDemissao').val();
    var dataAdmissao = $('#txtDataAdmissao').val();
    var aumentoSalario2 = $('#txtAumentoSalario2').val();
    var dataAlteracaoSalario2 = $('#txtDataAlteracaoSalario2').val();
    var cpf = colunas[10].innerHTML;

    colunas[0].innerHTML = coligada;
    colunas[2].innerHTML = dataAdmissao;
    // colunas[6].innerHTML = diretoria
    colunas[4].innerHTML = centroCusto;
    colunas[5].innerHTML = cargo;
    colunas[6].innerHTML = status;
    colunas[3].innerHTML = salario;
    if(dataDemissao != '') {
        colunas[7].innerHTML = dataDemissao;
    }
    if(dataAlteracaoSalario != '') {
        colunas[9].innerHTML = dataAlteracaoSalario;
    }
    colunas[11].innerHTML = aumentoSalario2;
    if(dataAlteracaoSalario2 != '') {
        colunas[12].innerHTML = dataAlteracaoSalario2;
    }

    var funcionario = {
        Nome: "",
        Coligada: "",
        Diretoria: "",
        CentroCusto: "",
        Cargo: "",
        Status: "",
        Salario: 0,
        DataAdmissao: "",
        CPF: "",
        DataSalario: "",
        DataDemissao: "",
        DataAumentoSalario2: "",
        AumentoSalario2: 0
    };
    
    funcionario.Nome = nome;
    funcionario.Coligada = coligada;
    // funcionario.Diretoria = diretoria;
    funcionario.CentroCusto = centroCusto;
    funcionario.Cargo = cargo;
    funcionario.Status = status;
    funcionario.Salario = removeMascaraMoeda(salario);
    if(dataAdmissao != ''){
        var dia = dataAdmissao.substr(0,2);
        var mes = dataAdmissao.substr(3,2);
        var ano = dataAdmissao.substr(6,4);
        funcionario.DataAdmissao = ano + '-' + mes + '-' + dia;
    } else {
        funcionario.DataAdmissao = '';
    }
    funcionario.CPF = cpf;
    // funcionario.Matricula = martricula;
    if(dataAlteracaoSalario != ''){
        var dia = dataAlteracaoSalario.substr(0,2);
        var mes = dataAlteracaoSalario.substr(3,2);
        var ano = dataAlteracaoSalario.substr(6,4);
        funcionario.DataSalario = ano + '-' + mes + '-' + dia;
    } else {
        funcionario.DataSalario = '';
    }
    if(dataDemissao != ''){
        var dia = dataDemissao.substr(0,2);
        var mes = dataDemissao.substr(3,2);
        var ano = dataDemissao.substr(6,4);
        funcionario.DataDemissao = ano + '-' + mes + '-' + dia;
    } else {
        funcionario.DataDemissao = '';
    }
    funcionario.AumentoSalario2 = removeMascaraMoeda(aumentoSalario2);
    if(dataAlteracaoSalario2 != ''){
        dataAlteracaoSalario2 = formataData(dataAlteracaoSalario2);
        funcionario.DataAumentoSalario2 = dataAlteracaoSalario2;
    }
    else {
        funcionario.DataAumentoSalario2 = '';
    }
    var dados = JSON.stringify(funcionario);

    alterarFuncionario(dados);

    //fecha o modal
    $('#editar_funcionario').modal('hide');
};

//Ação do botao buscar
$("#txtBuscar").keyup(function(){
    var tabela = $("#lista-funcionarios");
    if($('#txtBuscar').val() != '') {
        $("#lista-funcionarios tbody>tr").hide();
        $("#lista-funcionarios td:contains-ci('" + $('#txtBuscar').val() + "')").parent("tr").show();
    } else {
        $("#lista-funcionarios  tbody>tr").show();
    }
});

//acao de pesquisa dentro da table
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});