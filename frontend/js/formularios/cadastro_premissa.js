//Ação do botao buscar
$("#txtBuscar").keyup(function(){
    var tabela = $("#lista-coligadas");
    if($('#txtBuscar').val() != '') {
        $("#lista-coligadas tbody>tr").hide();
        $("#lista-coligadas td:contains-ci('" + $('#txtBuscar').val() + "')").parent("tr").show();
    } else {
        $("#lista-coligadas  tbody>tr").show();
    }
});

//acao de pesquisa dentro da table
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

function formatValor(n, currency) {
    var aux = '';
    if(n !== null)
        aux = currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\,)/g, "$ 1,").replace(".", ",");
    else 
        aux = currency + ' 0,00';
    return aux;
}

//Ação para cadastrar premissas
function editarPremissas(id){
    var linha = document.getElementById("linha"+id);
    var colunas = linha.getElementsByTagName('td');
    var coligada = colunas[3].innerHTML;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL_SERVICO + "/premissas/" + coligada);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.status === 200){
            var data = $.parseJSON(xhr.responseText).result;
            for(i = 0; i < data.length; i++){
                if(data[i].CodigoPremissa == 2)
                    $("#txtPlanoSaude").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 3)
                    $("#txtSeguroVida").val(formatValor(data[i].Valor, '%'));
                if(data[i].CodigoPremissa == 4)
                    $("#txtValeRefeicao").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 5)
                    $("#txtValeTransporte").val(formatValor(data[i].Valor,'%'));
                if(data[i].CodigoPremissa == 7)
                    $("#txtAjudaCusto").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 8)
                    $("#txtAuxilioCreche").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 9)
                    $("#txtContribuicaoSindical").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 10)
                    $("#txtCursosTreinamentos").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 11)
                    $("#txtMedicinaOcupacional").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 12)
                    $("#txtRecrutamento").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 13)
                    $("#txtUniformesEpi").val(formatValor(data[i].Valor,'R$'));
                if(data[i].CodigoPremissa == 16)
                    $("#txtBonus").val(formatValor(data[i].Valor,'R$'));
            }
        }
    }
    xhr.send();

    //passa os valores capturados
    $("#txtCodigoColigada").val(colunas[3].innerHTML);
    $("#txtColigada").val(colunas[0].innerHTML);
    $("#txtPlanoSaude").val('R$ 0,00');
    $("#txtValeRefeicao").val('R$ 0,00');
    $("#txtSeguroVida").val('% 0,00');
    $("#txtValeTransporte").val('% 0,00');
    $("#txtAjudaCusto").val('R$ 0,00');
    $("#txtAuxilioCreche").val('R$ 0,00');
    $("#txtContribuicaoSindical").val('R$ 0,00');
    $("#txtCursosTreinamentos").val('R$ 0,00');
    $("#txtMedicinaOcupacional").val('R$ 0,00');
    $("#txtRecrutamento").val('R$ 0,00');
    $("#txtUniformesEpi").val('R$ 0,00');
    $("#txtBonus").val('R$ 0,00');

    //mostra o modal
    $('#modal_premissas').modal('show');
};

function removeMascara(texto, mascara){
    var dado = texto.replace(mascara, "").replace(".","").replace(",",".");
    return dado;
};

function gravarPremissas(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/premissas");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
};

function salvarPremissas(){
    
    var coligada = $("#txtCodigoColigada").val();
    var planoSaude = removeMascara($("#txtPlanoSaude").val(), "R$ ");
    var valeRefeicao = removeMascara($("#txtValeRefeicao").val(), "R$ ");
    var seguroVida = removeMascara($("#txtSeguroVida").val(), "% ");
    var valeTransporte = removeMascara($("#txtValeTransporte").val(), "% ");
    var ajudaCusto = removeMascara($("#txtAjudaCusto").val(), "R$ ");
    var auxilioCreche = removeMascara($("#txtAuxilioCreche").val(), "R$ ");
    var contribuicaoSindical = removeMascara($("#txtContribuicaoSindical").val(), "R$ ");
    var cursosTreinamentos = removeMascara($("#txtCursosTreinamentos").val(), "R$ ");
    var medicinaOcupacional = removeMascara($("#txtMedicinaOcupacional").val(), "R$ ");
    var recrutamento = removeMascara($("#txtRecrutamento").val(), "R$ ");
    var uniformeEpi = removeMascara($("#txtUniformesEpi").val(), "R$ ");
    var bonus = removeMascara($("#txtBonus").val(), "R$ ");

    var premissa = {
        Coligada: coligada,
        CodigoPremissa: 0,
        Valor: 0
    }

    //plano de saude
    premissa.CodigoPremissa = 2;
    premissa.Valor = planoSaude;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //seguro vida
    premissa.CodigoPremissa = 3;
    premissa.Valor = seguroVida;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //vale refeicao
    premissa.CodigoPremissa = 4;
    premissa.Valor = valeRefeicao;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //vale transporte
    premissa.CodigoPremissa = 5;
    premissa.Valor = valeTransporte;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //ajuda custo
    premissa.CodigoPremissa = 7;
    premissa.Valor = ajudaCusto;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //auxilio creche
    premissa.CodigoPremissa = 8;
    premissa.Valor = auxilioCreche;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //contribuicao sindical
    premissa.CodigoPremissa = 9;
    premissa.Valor = contribuicaoSindical;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //cursos e treinamentos
    premissa.CodigoPremissa = 10;
    premissa.Valor = cursosTreinamentos;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //medicina ocupacional
    premissa.CodigoPremissa = 11;
    premissa.Valor = medicinaOcupacional;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //recrutamento
    premissa.CodigoPremissa = 12;
    premissa.Valor = recrutamento;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //Uniformes
    premissa.CodigoPremissa = 13;
    premissa.Valor = uniformeEpi;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    //Bonus
    premissa.CodigoPremissa = 16;
    premissa.Valor = bonus;
    var dados = JSON.stringify(premissa);
    gravarPremissas(dados);

    $('#modal_premissas').modal('hide');
}