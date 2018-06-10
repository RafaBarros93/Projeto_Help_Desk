let registros = [];

function preencheTable(){
    let menorPrecoMaterial = document.getElementById('lblFornecedorMenorPrecoMaterial');
    let menorPrecoMaoDeObra = document.getElementById('lblFornecedorMenorPrecoMaoDeObra');
    let menorPrecoTotal = document.getElementById('lblFornecedorMenorPrecoTotal');
    let tabela = document.getElementById('lista_corpo');
    tabela.innerHTML = '';

    let menorTotal = 0;
    let menorMaterial = 0;
    let menorMaoDeObra = 0;
    for(let i in registros){
        tabela.innerHTML += 
        `
            <tr>
                <td>${registros[i].Empreendimento}</td>
                <td>${registros[i].Fornecedor}</td>
                <td>${registros[i].Material}</td>
                <td>${registros[i].Peso}</td>
                <td>${registros[i].PesoMetroQuadrado}</td>
                <td>${formatValor(registros[i].ValorMaterial, 'R$ ')}</td>
                <td>${registros[i].ValorMaterialPeso}</td>
                <td>${formatValor(registros[i].ValorMaoDeObra, 'R$ ')}</td>
                <td>${registros[i].ValorMaoDeObraPeso}</td>
                <td>${formatValor(registros[i].ValorTotal, 'R$ ')}</td>
                <td>${registros[i].ValorTotalPeso}</td>
                <td>${formataDataBrasileira(registros[i].Data)}</td>
                <td style="white-space: nowrap">
                <button class="btn btn-danger btn-xs selecao" title="Escolher Proposta" id="btn${i}" onclick="escolherProposta(${i})">Escolher Proposta</button>&nbsp;
                </td>
            </tr>
        `;
        //menor valor total
        if(menorTotal == 0){
            menorTotal = registros[i].ValorTotal;
            menorPrecoTotal.innerHTML = `Menor Preço Total: ${registros[i].Fornecedor} - ${formatValor(menorTotal, 'R$ ')}`;
        } else {
            if(menorTotal > registros[i].ValorTotal){
                menorTotal = registros[i].ValorTotal;
                menorPrecoTotal.innerHTML = `Menor Preço Total: ${registros[i].Fornecedor} - ${formatValor(menorTotal, 'R$ ')}`;
            }
        }
        //menor valor material
        if(menorMaterial == 0){
            menorMaterial = registros[i].ValorMaterial;
            menorPrecoMaterial.innerHTML = `Menor Preço Material: ${registros[i].Fornecedor} - ${formatValor(menorMaterial, 'R$ ')}`;
        } else {
            if(menorMaterial > registros[i].ValorMaterial){
                menorMaterial = registros[i].ValorMaterial;
                menorPrecoMaterial.innerHTML = `Menor Preço Material: ${registros[i].Fornecedor} - ${formatValor(menorMaterial, 'R$ ')}`;
            }
        }
        //Menor valor mao de obra
        if(menorMaoDeObra == 0){
            menorMaoDeObra = registros[i].ValorMaoDeObra;
            menorPrecoMaoDeObra.innerHTML = `Menor Preço Mão de Obra: ${registros[i].Fornecedor} - ${formatValor(menorMaoDeObra, 'R$ ')}`;
        } else {
            if(menorMaoDeObra > registros[i].ValorMaoDeObra){
                menorMaoDeObra = registros[i].ValorMaoDeObra;
                menorPrecoMaoDeObra.innerHTML = `Menor Preço Mão de Obra: ${registros[i].Fornecedor} - ${formatValor(menorMaoDeObra, 'R$ ')}`;
            }
        }
    }
}

function escolherProposta(indice){
    
    let buttons = document.getElementsByClassName('selecao');
    for(let i in buttons){
        if(buttons[i].id == 'btn' + indice){
            buttons[i].className = 'btn btn-success btn-xs selecao';
            buttons[i].innerHTML = 'Proposta Escolhida';
            document.getElementById('finalizarCotacao').disabled = false;
        } else {
            buttons[i].className = 'btn btn-danger btn-xs selecao';
            buttons[i].innerHTML = 'Escolher Proposta';
        }
    }
}

function carregaEmpreendimento(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL_SERVICO + '/obraDepartamento');
    xhr.onload = function(){
        if(xhr.status == 200){
            let data = $.parseJSON(xhr.responseText).result;
            document.getElementById('selFiltroEmpreendimento').innerHTML = '';
            $('#selFiltroEmpreendimento').append(`<option value="0"></option>`);
            for(let x in data){
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
            document.getElementById('selFiltroFornecedor').innerHTML = '';
            $('#selFiltroFornecedor').append(`<option value="0"></option>`);
            for(let x in data){
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
            document.getElementById('selFiltroMaterialServico').innerHTML = '';
            $('#selFiltroMaterialServico').append(`<option value="0"></option>`);
            for(let x in data){
                $('#selFiltroMaterialServico').append(`<option value="${data[x].Nome}">${data[x].Descricao}</option>`);
            }
        }
    }
    xhr.send();
}

$(window).on("load", function(){
    carregaEmpreendimento();
    carregaFornecedor();
    carregaMaterial();
});

function listarRegistros(){
    document.getElementById('lblFornecedorMenorPrecoMaterial').innerHTML = '';
    document.getElementById('lblFornecedorMenorPrecoMaoDeObra').innerHTML = '';
    document.getElementById('lblFornecedorMenorPrecoTotal').innerHTML = '';
    let empreendimento = document.getElementById('selFiltroEmpreendimento').value;
    let fornecedor = document.getElementById('selFiltroFornecedor').value
    let material = document.getElementById('selFiltroMaterialServico').value;
    let valor = document.getElementById('selFiltroValor').value; 
    document.getElementById('finalizarCotacao').disabled = true;
    carregaPropostas(empreendimento, fornecedor, material, valor);
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

function finalizarCotacao(){
    let buttons = document.getElementsByClassName('selecao');
    let propostas = [];
    for(let i = 0; i < buttons.length; i++){
        let btn = buttons[i].id.replace('btn','');
        let codigoProposta = registros[btn].CodigoProposta;
        if(buttons[i].innerHTML == 'Proposta Escolhida'){
            let proposta = {};
            proposta.CodigoProposta = codigoProposta;
            proposta.Escolhida = 'S';
            proposta.Validada = 'S';
            propostas.push(proposta);
        } else {
            let proposta = {};
            proposta.CodigoProposta = codigoProposta;
            proposta.Escolhida = 'N';
            proposta.Validada = 'S';
            propostas.push(proposta);
        }
    }

    let dados = JSON.stringify(propostas);
    gravarBD(dados);
    listarRegistros();
}

function gravarBD(dados){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", BASE_URL_SERVICO + "/propostaTecnica/escolherProposta", false);//realiza uma chamada sincrona para receber o id gerado
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dados);
    if(xhr.status === 200){
        var data = $.parseJSON(xhr.responseText).result;
    }
};