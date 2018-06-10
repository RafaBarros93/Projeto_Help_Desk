const funcionarioStatus = require('../models/funcionario_status');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await funcionarioStatus.get();
    resposta.montaRetorno(retorno, req, res);
}