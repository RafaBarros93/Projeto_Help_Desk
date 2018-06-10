const origem = require('../models/origem');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await origem.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await origem.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await origem.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await origem.post(dados);
    resposta.montaRetorno(retorno, req, res);
}