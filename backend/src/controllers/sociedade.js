const sociedade = require('../models/sociedade');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await sociedade.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await sociedade.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await sociedade.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await sociedade.post(dados);
    resposta.montaRetorno(retorno, req, res);
}