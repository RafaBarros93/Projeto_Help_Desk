const rfp = require('../models/rfp');
const resposta = require('../../config/rotinas');

module.exports.get = async function(macroProcesso, empresa, req, res){
    let retorno = await rfp.get(macroProcesso, empresa);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await rfp.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.getEmpresa = async function(req, res){
    let retorno = await rfp.getEmpresa();
    resposta.montaRetorno(retorno, req, res);
}

module.exports.getMacroProcesso = async function(empresa, req, res){
    let retorno = await rfp.getMacroProcesso(empresa);
    resposta.montaRetorno(retorno, req, res);
}