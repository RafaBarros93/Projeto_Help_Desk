const funcionarioFolha = require('../models/funcionario_folha');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await funcionarioFolha.get();
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retornoExclusao = await funcionarioFolha.delete(dados);
    let retorno = await funcionarioFolha.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await funcionarioFolha.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(dados, req, res){
    let retorno = await funcionarioFolha.delete(dados);
    resposta.montaRetorno(retorno, req, res);
}