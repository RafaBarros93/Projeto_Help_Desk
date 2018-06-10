const cargo = require('../models/cargo');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await cargo.get();
    resposta.montaRetorno(retorno, req, res);
}