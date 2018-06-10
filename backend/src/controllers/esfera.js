const esfera = require('../models/esfera');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await esfera.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await esfera.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await esfera.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await esfera.post(dados);
    resposta.montaRetorno(retorno, req, res);
}