const atividadeCalendarioContabil = require('../models/atividade_calendario_contabil');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await atividadeCalendarioContabil.get();
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await atividadeCalendarioContabil.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await atividadeCalendarioContabil.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await atividadeCalendarioContabil.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.getCalendario = async function(req, res){
    let retorno = await atividadeCalendarioContabil.getCalendario();
    resposta.montaRetorno(retorno, req, res);
}
