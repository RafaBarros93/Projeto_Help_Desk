const centroCusto = require('../models/centro_custo');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await centroCusto.get();
    resposta.montaRetorno(retorno, req, res);
}