//array de dependentes
var dependentes = [];
//objeto de cadastro;
var cadastro;

//Calcula idade
function getIdade(data){
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        split = data.split('-'),
        novadata = split[1] + "/" +split[2]+"/"+split[0],
        data_americana = new Date(novadata),
        vAno = data_americana.getFullYear(),
        vMes = data_americana.getMonth() + 1,
        vDia = data_americana.getDate(),
        ano_aniversario = +vAno,
        mes_aniversario = +vMes,
        dia_aniversario = +vDia,
        quantos_anos = ano_atual - ano_aniversario;
    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }
    return quantos_anos < 0 ? 0 : quantos_anos;
}

$(document).ready(function(){
    var cookie = $.parseJSON($.cookie('VP6_Patrimar_Session'));
    if ((cookie.CPF != '') && (cookie.CPF != null)){
        carregaDadosCadastrais(cookie.CPF);
        preencheFormulario();
    }

    $('#btnSalvarAlteracoes').click(function () {
        $(':required:invalid', '#formulario').each(function () {
           var id = $('.tab-pane').find(':required:invalid').closest('.tab-pane').attr('id');
     
           $('.nav a[href="#' + id + '"]').tab('show');
        });
     });

    $('#txtCep').focusout(function(){
        var cep = removeMascaraCep(this.value);
        if(cep.length == 8){
            var dados = buscarCep(this.value);
            if (dados.logradouro != undefined){
                var tipoRua = dados.logradouro.substr(0,dados.logradouro.indexOf(' '));
                var logradouro = dados.logradouro.substr(dados.logradouro.indexOf(' ') +1, dados.logradouro.length);
                document.getElementById('selTipoRua').value = tipoRua;
                document.getElementById('txtRua').value = logradouro;
                document.getElementById('txtComplemento').value = dados.complemento;
                document.getElementById('txtBairro').value = dados.bairro;
                document.getElementById('txtCidade').value = dados.localidade;
                document.getElementById('selEstado').value = dados.uf;
            }
        }
    });
});

//funcao para adicionar dependente
function adicionarDependente(){
    var chapa = document.getElementById('txtChapa').value;
    var nome = document.getElementById('txtNomeDependente').value;
    var cpf = removeMascaraCPFCNPJ(document.getElementById('txtCPFDependente').value);
    var dataNascimento = formataData(document.getElementById('txtDataNascimentoDependente').value);
    var sexo = document.getElementById('selSexoDependente').value;
    var estadoCivil = document.getElementById('selEstadoCivilDependente').value;
    var localNascimento = document.getElementById('txtLocalNascimento').value;
    var cartorio = document.getElementById('txtCartorio').value;
    var numeroRegistro = document.getElementById('txtNumeroRegistroDependente').value;
    var numeroLivro = document.getElementById('txtNumeroLivro').value;
    var numeroFolha = document.getElementById('txtNumeroFolha').value;
    var grauParentesco = document.getElementById('selGrauParentesco').value;
    var cartaoVacina;
    if (document.getElementById('chbCartaoVacina').checked)
        cartaoVacina = 'S';
    else
        cartaoVacina = 'N';
    var percentualPensao = removeMascaraPercentual(document.getElementById('txtPercentualPensao').value);
    // var tipoPensao = document.getElementById('selTipoPensao').value;
    var banco = document.getElementById('txtBanco').value;
    var agencia = document.getElementById('txtAgencia').value;
    var conta = document.getElementById('txtContaCorrente').value;
    var responsavel = document.getElementById('txtResponsavel').value;
    var dataEntregaCertidao = formataData(document.getElementById('txtDataEntregaCertidao').value);
    var frequenciaEscolar = document.getElementById('selFrequenciaEscolar').value;
    var universitario;
    if(document.getElementById('chbUniversitario').checked)
        universitario = 'S';
    else 
        universitario = 'N';
    var numeroCartaoSUS = document.getElementById('txtNumeroCartaoSUS').value;
    var planoSaude = document.getElementById('txtPlanoSaude').value;

    if ((nome == '') || (cpf == '') || (localNascimento == '') || (cartorio == '') || 
        (numeroRegistro == 0) || (numeroRegistro == '') || (numeroLivro == '') || (numeroLivro == 0) ||
        (numeroFolha == '') || (numeroFolha == 0)) {
        $('#mensagem').show();
    } else {
        //monta o objeto a ser gravado
        var dependente = {
            Chapa: chapa,
            Nome: nome,
            CPF: cpf, 
            DataNascimento: dataNascimento,
            Sexo: sexo,
            EstadoCivil: estadoCivil,
            LocalNascimento: localNascimento,
            Cartorio: cartorio,
            NumeroRegistro: numeroRegistro,
            NumeroLivro: numeroLivro,
            NumeroFolha: numeroFolha,
            GrauParentesco: grauParentesco,
            CartaoVacina: cartaoVacina,
            PercentualPensao: percentualPensao,
            // TipoPensao: tipoPensao,
            Banco: banco,
            Agencia: agencia,
            Conta: conta,
            Responsavel: responsavel,
            DataEntregaCertidao: dataEntregaCertidao,
            FrequenciaEscolar: frequenciaEscolar,
            Universitario: universitario,
            NumeroCartaoSUS: numeroCartaoSUS,
            PlanoSaude: planoSaude,
            CodigoColigada: cadastro.CodigoColigada
        };

        var indice = document.getElementById('txtIndiceDependente').value;
        if (indice == '')
            dependentes.push(dependente);
        else 
            dependentes[indice] = dependente;
        preencheDependente();
        $('#formulario-modal').modal('hide');
    }
};

function exibirConfirmarExcluir(indice){
    var mensagem = document.getElementById('mensagem_modal_confirmar');
    mensagem.innerHTML = 'Atenção! Confirma a exclusão do registro?';
    //captura o button de confirmar do modal_confirmar
    var btnModalConfirmar = document.getElementById('btnModalConfirmar');
    //cria o evento onclick
    var onClick = document.createAttribute('onclick');
    //define o evento onclick
    onClick.value = 'excluirDependente('+indice+')';
    //atribui ao elemento html
    btnModalConfirmar.attributes.setNamedItem(onClick);
    $('#modal_confirmar').modal('show');
}

//função para excluir um dependente
function excluirDependente(indice){
    $('#modal_confirmar').modal('hide');
    if (indice === dependentes.length -1){
        dependentes.pop();
    } else if (indice === 0) { //verifica se o indice a ser deletado é o primeiro do array de registros
        dependentes.shift();
    } else { 
        var auxInicio = dependentes.slice(0,indice);
        var auxFim = dependentes.slice(indice+1);
        dependentes = auxInicio.concat(auxFim);
    }
    preencheDependente();
}

//funcao para limpar os campos de dependente
function novoDependente(){
    document.getElementById('txtIndiceDependente').value = '';
    document.getElementById('txtNomeDependente').value = '';
    document.getElementById('txtCPFDependente').value = '';
    document.getElementById('txtDataNascimentoDependente').value = '';
    document.getElementById('selSexoDependente').value = '';
    document.getElementById('selEstadoCivilDependente').value = '';
    document.getElementById('txtLocalNascimento').value = '';
    document.getElementById('txtCartorio').value = '';
    document.getElementById('txtNumeroRegistroDependente').value = '';
    document.getElementById('txtNumeroLivro').value = '';
    document.getElementById('txtNumeroFolha').value = '';
    document.getElementById('selGrauParentesco').value = '';
    document.getElementById('chbCartaoVacina').checked = false;
    document.getElementById('txtPercentualPensao').value = '';
    // var tipoPensao = document.getElementById('selTipoPensao').value;
    document.getElementById('txtBanco').value = '';
    document.getElementById('txtAgencia').value = '';
    document.getElementById('txtContaCorrente').value = '';
    document.getElementById('txtResponsavel').value = '';
    document.getElementById('txtDataEntregaCertidao').value = '';
    document.getElementById('selFrequenciaEscolar').value = '';
    document.getElementById('chbUniversitario').checked = false;
    document.getElementById('txtNumeroCartaoSUS').value = '';
    document.getElementById('txtPlanoSaude').value = '';
    $('#formulario-modal').modal();
}

//funcao para editar um dependente
function editarDependente(indice){
    document.getElementById('txtIndiceDependente').value = indice;
    document.getElementById('txtChapa').value = dependentes[indice].Chapa;
    document.getElementById('txtNomeDependente').value = dependentes[indice].Nome;
    document.getElementById('txtCPFDependente').value = formataCPF(dependentes[indice].CPF);
    document.getElementById('txtDataNascimentoDependente').value = formataDataBrasileira(dependentes[indice].DataNascimento);
    document.getElementById('selSexoDependente').value = dependentes[indice].Sexo;
    document.getElementById('selEstadoCivilDependente').value = dependentes[indice].EstadoCivil;
    document.getElementById('txtLocalNascimento').value = dependentes[indice].LocalNascimento;
    document.getElementById('txtCartorio').value = dependentes[indice].Cartorio;
    document.getElementById('txtNumeroRegistroDependente').value = dependentes[indice].NumeroRegistro;
    document.getElementById('txtNumeroLivro').value = dependentes[indice].NumeroLivro;
    document.getElementById('txtNumeroFolha').value = dependentes[indice].NumeroFolha;
    document.getElementById('selGrauParentesco').value = dependentes[indice].GrauParentesco;
    if (dependentes[indice].CartaoVacina == 'S')
        document.getElementById('chbCartaoVacina').checked = true;
    else
        document.getElementById('chbCartaoVacina').checked = false;
    document.getElementById('txtPercentualPensao').value = formatValor(dependentes[indice].PercentualPensao, '%');
    // var tipoPensao = document.getElementById('selTipoPensao').value;
    document.getElementById('txtBanco').value = dependentes[indice].Banco;
    document.getElementById('txtAgencia').value = dependentes[indice].Agencia;
    document.getElementById('txtContaCorrente').value = dependentes[indice].Conta;
    document.getElementById('txtResponsavel').value = dependentes[indice].Responsavel;
    document.getElementById('txtDataEntregaCertidao').value = formataDataBrasileira(dependentes[indice].DataEntregaCertidao);
    document.getElementById('selFrequenciaEscolar').value = dependentes[indice].FrequenciaEscolar;
    if(dependentes[indice].Universitario == 'S')
        document.getElementById('chbUniversitario').checked = true;
    else 
        document.getElementById('chbUniversitario').checked = false;
    document.getElementById('txtNumeroCartaoSUS').value = dependentes[indice].NumeroCartaoSUS;
    document.getElementById('txtPlanoSaude').value = dependentes[indice].PlanoSaude;
    $('#formulario-modal').modal();
}

//funcao para preencher a tabela de dependentes
function preencheDependente(){
    var tabela = document.getElementById('lista-dependentes');
    tabela.innerHTML = '';
    for(var i = 0; i < dependentes.length;i++){
        var sexo;
        switch(dependentes[i].Sexo){
            case "M":
                sexo = "Masculino";
                break;
            case "F":
                sexo = "Feminino";
                break;
            default:
                sexo = "";
        }
        tabela.innerHTML += 
            `<tr> 
                <td>${dependentes[i].Nome}</td>
                <td>${getIdade(dependentes[i].DataNascimento)}</td>
                <td>${sexo}</td>
                <td>${dependentes[i].EstadoCivil}</td>
                <td style="white-space: nowrap">
                    <button type="button" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Editar" onclick="editarDependente(${i})"></button>&nbsp;
                    <button type="button" class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Excluir" onclick="exibirConfirmarExcluir(${i})"></button>
                </td>
            </tr>`;
    };
};

//funcao para atualizar os dados cadastrais
function atualizarDados(){
    //Identificacao
    var codigoCadastro = document.getElementById('txtCodigo').value;
    var chapa = document.getElementById('txtChapa').value;
    var nome = document.getElementById('txtNome').value;
    var dataNascimento = formataData(document.getElementById('txtDataNascimento').value);
    var email = document.getElementById('txtEmail').value;
    var nomePai = document.getElementById('txtNomePai').value;
    var nomeMae = document.getElementById('txtNomeMae').value;
    var estadoNatal = document.getElementById('selEstadoNatal').value;
    var naturalidade = document.getElementById('selNaturalidade').value;
    var nacionalidade = document.getElementById('selNacionalidade').value;
    var estadoCivil = document.getElementById('selEstadoCivil').value;
    var sexo = document.getElementById('selSexo').value;
    var grauInstrucao = document.getElementById('selGrauInstrucao').value;
    var corRaca = document.getElementById('selCorRaca').value;

    //Documento
    var cpf = removeMascaraCPFCNPJ(document.getElementById('txtCPF').value);
    var identidade = document.getElementById('txtIdentidade').value;
    var dataEmissaoIdentidade = formataData(document.getElementById('txtDataEmissaoIdentidade').value);
    var orgaoEmissorIdentidade = document.getElementById('txtOrgaoEmissorIdentidade').value;
    var ufIdentidade = document.getElementById('selUFIdentidade').value;
    var numeroCNH = document.getElementById('txtNumeroCNH').value;
    var categoriaCNH = document.getElementById('selCategoriaCNH').value;
    var orgaoEmissorCNH = document.getElementById('txtOrgaoEmissorCNH').value;
    var estadoCNH = document.getElementById('selEstadoCNH').value;
    var dataEmissaoCNH = formataData(document.getElementById('txtDataEmissaoCNH').value);
    var dataVencimentoCNH = formataData(document.getElementById('txtDataVencimentoCNH').value);
    var numeroCarteiraTrabalho = document.getElementById('txtNumeroCarteiraTrabalho').value;
    var serieCarteiraTrabalho = document.getElementById('txtSerieCarteiraTrabalho').value;
    var ufCarteiraTrabalho = document.getElementById('selUFCarteiraTrabalho').value;
    var numeroPIS = document.getElementById('txtNumeroPIS').value;
    var numeroTituloEleitor = document.getElementById('txtNumeroTituloEleitor').value;
    var zona = document.getElementById('txtZona').value;
    var secao = document.getElementById('txtSecao').value;
    var dataEmissaoTituloEleitor = formataData(document.getElementById('txtDataEmissaoTituloEleitor').value);
    var orgaoEmissaoRegistroEstrangeiro = document.getElementById('txtOrgaoEmissaoRegistroEstrangeiro').value;
    var dataEmissaoRegistroEstrangeiro = document.getElementById('txtDataEmissaoRegistroEstrangeiro').value;
    var dataChegada = formataData(document.getElementById('txtDataChegada').value);
    var dataNaturalizacaoEstrangeiro = formataData(document.getElementById('txtDataNaturalizacaoEstrangeiro').value);
    var paisOrigem = document.getElementById('txtPaisOrigem').value;
    var conjugeBrasil;
    if(document.getElementById('chbConjugeBrasil').checked)
        conjugeBrasil = 'S'
    else 
        conjugeBrasil = 'N';

    //Endereco
    var cep = removeMascaraCep(document.getElementById('txtCep').value);
    var tipoRua = document.getElementById('selTipoRua').value;
    var rua = document.getElementById('txtRua').value;
    var numero = document.getElementById('txtNumero').value;
    var complemento = document.getElementById('txtComplemento').value;
    // var tipoBairro = document.getElementById('selTipoBairro').value;
    var bairro = document.getElementById('txtBairro').value;
    var cidade = document.getElementById('txtCidade').value;
    var estado = document.getElementById('selEstado').value;
    var codigoPaisEndereco = document.getElementById('selCodigoPaisEndereco').value;
    var telefoneContato1 = removeMascaraTelefone(document.getElementById('txtTelefoneContato1').value);
    var telefoneContato2 = removeMascaraTelefone(document.getElementById('txtTelefoneContato2').value);
    var telefoneContato3 = removeMascaraTelefone(document.getElementById('txtTelefoneContato3').value);

    //Registro Profissional
    var numeroRegistroProfissional = document.getElementById('txtNumeroRegistroProfissional').value;
    var codigoOrgaoRegulamentador = document.getElementById('txtCodigoOrgaoRegulamentador').value;
    var ufProfissao = document.getElementById('selUFProfissao').value;
    var dataEmissaoProfissao = formataData(document.getElementById('txtDataEmissaoProfissao').value);

    //cria o objeto a ser enviado para o banco de dados
    var registro = {
        //identificacao
        CodigoCadastro: codigoCadastro,
        Chapa: chapa,
        Nome: nome,
        DataNascimento: dataNascimento,
        Email: email,
        NomePai: nomePai,
        NomeMae: nomeMae,
        EstadoNatal: estadoNatal,
        Naturalidade: naturalidade,
        Nacionalidade: nacionalidade,
        EstadoCivil: estadoCivil,
        Sexo: sexo,
        GrauInstrucao: grauInstrucao,
        CorRaca: corRaca,
        //documentos
        CPF: cpf,
        Identidade: identidade,
        DataEmissaoIdentidade: dataEmissaoIdentidade,
        OrgaoEmissorIdentidade: orgaoEmissorIdentidade,
        UFIdentidade: ufIdentidade,
        NumeroCNH: numeroCNH,
        CategoriaCNH: categoriaCNH,
        OrgaoEmissorCNH: orgaoEmissorCNH,
        EstadoCNH: estadoCNH,
        DataEmissaoCNH: dataEmissaoCNH,
        DataVencimentoCNH: dataVencimentoCNH,
        NumeroCarteiraTrabalho: numeroCarteiraTrabalho,
        SerieCarteiraTrabalho: serieCarteiraTrabalho,
        UFCarteiraTrabalho: ufCarteiraTrabalho,
        NumeroPIS: numeroPIS,
        NumeroTituloEleitor: numeroTituloEleitor,
        Zona: zona,
        Secao: secao,
        DataEmissaoTituloEleitor: dataEmissaoTituloEleitor,
        OrgaoEmissorRegistroEstrangeiro: orgaoEmissaoRegistroEstrangeiro,
        DataEmissaoRegistroEstrangeiro: dataEmissaoRegistroEstrangeiro,
        DataChegada: dataChegada,
        DataNaturalizacao: dataNaturalizacaoEstrangeiro,
        PaisOrigem: paisOrigem,
        ConjugeBrasil: conjugeBrasil,
        //Endereco
        Cep: cep,
        TipoRua: tipoRua,
        Rua: rua,
        Numero: numero,
        Complemento: complemento,
        // TipoBairro: tipoBairro,
        Bairro: bairro,
        Cidade: cidade,
        Estado: estado,
        CodigoPaisEndereco: codigoPaisEndereco,
        TelefoneContato1: telefoneContato1,
        TelefoneContato2: telefoneContato2,
        TelefoneContato3: telefoneContato3,
        //registro profissional
        NumeroRegistroProfissional: numeroRegistroProfissional,
        CodigoOrgaoRegulamentador: codigoOrgaoRegulamentador,
        UFProfissao: ufProfissao,
        DataEmissaoProfissao: dataEmissaoProfissao,
        CodigoColigada: cadastro.CodigoColigada,
        //dependentes
        Dependentes: dependentes
    };

    var dados = JSON.stringify(registro);
    alterarDB(dados);
};

//funcao para carregar os dados cadastrais do cpf
function carregaDadosCadastrais(cpf){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/esocial/"+ cpf, false);
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            cadastro = data[0];
        }
    }
    xhr.send();
};

//funcao para preencher os dados do formulario
function preencheFormulario(){
    if ((cadastro != undefined) && (cadastro != null)){
        dependentes = cadastro.Dependentes;
        preencheDependente();
        //Identificacao
        document.getElementById('txtCodigo').value = cadastro.CodigoCadastro;
        document.getElementById('txtChapa').value = cadastro.Chapa;
        document.getElementById('txtNome').value = cadastro.Nome;
        document.getElementById('txtDataNascimento').value = formataDataBrasileira(cadastro.DataNascimento);
        document.getElementById('txtEmail').value = cadastro.Email;
        document.getElementById('txtNomePai').value = cadastro.NomePai;
        document.getElementById('txtNomeMae').value = cadastro.NomeMae;
        document.getElementById('selEstadoNatal').value = cadastro.EstadoNatal;
        document.getElementById('selNaturalidade').value = cadastro.Naturalidade;
        document.getElementById('selNacionalidade').value = cadastro.Nacionalidade;
        document.getElementById('selEstadoCivil').value = cadastro.EstadoCivil;
        document.getElementById('selSexo').value = cadastro.Sexo;
        document.getElementById('selGrauInstrucao').value = cadastro.GrauInstrucao;
        document.getElementById('selCorRaca').value = cadastro.CorRaca;

        //Documento
        document.getElementById('txtCPF').value = formataCPF(cadastro.CPF);
        document.getElementById('txtIdentidade').value = cadastro.Identidade;
        document.getElementById('txtDataEmissaoIdentidade').value = formataDataBrasileira(cadastro.DataEmissaoIdentidade);
        document.getElementById('txtOrgaoEmissorIdentidade').value = cadastro.OrgaoEmissorIdentidade;
        document.getElementById('selUFIdentidade').value = cadastro.UFIdentidade;
        document.getElementById('txtNumeroCNH').value = cadastro.NumeroCNH;
        document.getElementById('selCategoriaCNH').value = cadastro.CategoriaCNH;
        document.getElementById('txtOrgaoEmissorCNH').value = cadastro.OrgaoEmissorCNH;
        document.getElementById('selEstadoCNH').value = cadastro.EstadoCNH;
        document.getElementById('txtDataEmissaoCNH').value = formataDataBrasileira(cadastro.DataEmissaoCNH);
        document.getElementById('txtDataVencimentoCNH').value = formataDataBrasileira(cadastro.DataVencimentoCNH);
        document.getElementById('txtNumeroCarteiraTrabalho').value = cadastro.NumeroCarteiraTrabalho;
        document.getElementById('txtSerieCarteiraTrabalho').value = cadastro.SerieCarteiraTrabalho;
        document.getElementById('selUFCarteiraTrabalho').value = cadastro.UFCarteiraTrabalho;
        document.getElementById('txtNumeroPIS').value = cadastro.NumeroPIS;
        document.getElementById('txtNumeroTituloEleitor').value = cadastro.NumeroTituloEleitor;
        document.getElementById('txtZona').value = cadastro.Zona;
        document.getElementById('txtSecao').value = cadastro.Secao;
        document.getElementById('txtDataEmissaoTituloEleitor').value = formataDataBrasileira(cadastro.DataEmissaoTituloEleitor);
        document.getElementById('txtOrgaoEmissaoRegistroEstrangeiro').value = cadastro.OrgaoEmissorRegistroEstrangeiro
        document.getElementById('txtDataEmissaoRegistroEstrangeiro').value = formataDataBrasileira(cadastro.DataEmissaoRegistroEstrangeiro);
        document.getElementById('txtDataChegada').value = formataDataBrasileira(cadastro.DataChegada);
        document.getElementById('txtDataNaturalizacaoEstrangeiro').value = formataDataBrasileira(cadastro.DataNaturalizacao);
        document.getElementById('txtPaisOrigem').value = cadastro.PaisOrigem;
        if (cadastro.ConjugeBrasil == 'S')
            document.getElementById('chbConjugeBrasil').checked = true;
        else
            document.getElementById('chbConjugeBrasil').checked = false;

        //Endereco
        document.getElementById('txtCep').value = formataCep(cadastro.Cep);
        document.getElementById('selTipoRua').value = cadastro.TipoRua;
        document.getElementById('txtRua').value = cadastro.Rua;
        document.getElementById('txtNumero').value = cadastro.Numero;
        document.getElementById('txtComplemento').value = cadastro.Complemento;
        // var tipoBairro = document.getElementById('selTipoBairro').value;
        document.getElementById('txtBairro').value = cadastro.Bairro;
        document.getElementById('txtCidade').value = cadastro.Cidade;
        document.getElementById('selEstado').value = cadastro.Estado;
        document.getElementById('selCodigoPaisEndereco').value = cadastro.CodigoPaisEndereco;
        document.getElementById('txtTelefoneContato1').value = formataTelefone(cadastro.TelefoneContato1);
        document.getElementById('txtTelefoneContato2').value = formataTelefone(cadastro.TelefoneContato2);
        document.getElementById('txtTelefoneContato3').value = formataTelefone(cadastro.TelefoneContato3);

        //Registro Profissional
        document.getElementById('txtNumeroRegistroProfissional').value = cadastro.NumeroRegistroProfissional;
        document.getElementById('txtCodigoOrgaoRegulamentador').value = cadastro.CodigoOrgaoRegulamentador;
        document.getElementById('selUFProfissao').value = cadastro.UFProfissao;
        document.getElementById('txtDataEmissaoProfissao').value = formataDataBrasileira(cadastro.DataEmissaoProfissao);
    }
};

//funcao para alterar um registro no bd
function alterarDB(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_URL_SERVICO + "/esocial", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
        return data[0].id;
    }
};

//funcao para buscar cep
function buscarCep(cep){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://viacep.com.br/ws/${cep}/json/`, false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText);
        return data;
    }
};