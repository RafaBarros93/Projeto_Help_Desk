const estruturaProcesso = require('../models/estrutura_processo');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await estruturaProcesso.get(id);
    resposta.montaRetorno(retorno, req, res);
}