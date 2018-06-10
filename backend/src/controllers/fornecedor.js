const fornecedor = require('../models/fornecedor');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await fornecedor.get();
    resposta.montaRetorno(retorno, req, res);
}
