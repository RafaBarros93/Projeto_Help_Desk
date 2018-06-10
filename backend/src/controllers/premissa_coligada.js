const premissaColigada = require('../models/premissa_coligada');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, req, res){
    let retorno = await premissaColigada.get(coligada);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retornoDelete = await premissaColigada.delete(dados);
    let retorno = await premissaColigada.post(dados);
    resposta.montaRetorno(retorno, req, res);
}