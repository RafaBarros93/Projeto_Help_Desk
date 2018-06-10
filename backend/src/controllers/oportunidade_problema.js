const oportunidadeProblema = require('../models/oportunidade_problema');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await oportunidadeProblema.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await oportunidadeProblema.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await oportunidadeProblema.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await oportunidadeProblema.post(dados);
    resposta.montaRetorno(retorno, req, res);
}