const processoAditivo = require('../models/processo_aditivo');
const resposta = require('../../config/rotinas'); 

module.exports.get = async function(id, req, res){
    let retorno = await processoAditivo.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await processoAditivo.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await processoAditivo.post(dados);
    resposta.montaRetorno(retorno, req, res);
}