const acompanhamento = require('../models/acompanhamento');
const acompanhamentoItem = require('../models/acompanhamento_item');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await acompanhamento.get();
    for(let i = 0; i < retorno.result.length; i++){
        let itens = await acompanhamentoItem.get(retorno.result[i].CodigoAcompanhamento);
        retorno.result[i].Itens = itens.result;
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let itens = dados.Itens;
    dados.Itens = null;
    let retorno = await acompanhamento.put(dados);
    let retornoDeleteItem = await acompanhamentoItem.delete(dados.CodigoAcompanhamento);
    for (let i = 0; i < itens.length; i++){
        itens[i].CodigoAcompanhamento = dados.CodigoAcompanhamento;
        let retornoItem = await acompanhamentoItem.post(itens[i]);
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retornoDeleteItem = await acompanhamentoItem.delete(id);
    let retorno = await acompanhamento.delete(id);   
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let itens = dados.Itens;
    dados.Itens = null;
    let retorno = await acompanhamento.post(dados);
    for (let i = 0; i < itens.length; i++){
        itens[i].CodigoAcompanhamento = retorno.result[0].id;
        let retornoItem = await acompanhamentoItem.post(itens[i]);
    }
    resposta.montaRetorno(retorno, req, res);
}