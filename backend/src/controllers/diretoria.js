const diretoria = require('../models/diretoria');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await diretoria.get();
    resposta.montaRetorno(retorno, req, res);
}