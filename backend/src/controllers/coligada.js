const coligada = require('../models/coligada');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await coligada.get();
    resposta.montaRetorno(retorno, req, res);
}