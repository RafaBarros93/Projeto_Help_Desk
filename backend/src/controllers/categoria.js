const categoria = require('../models/categoria');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await categoria.get(id);
    resposta.montaRetorno(retorno, req, res);
}