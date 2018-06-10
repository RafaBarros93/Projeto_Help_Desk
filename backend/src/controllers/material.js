const material = require('../models/material');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await material.get();
    resposta.montaRetorno(retorno, req, res);
}
