const usuarioLogAcesso = require('../models/usuario_log_acesso');
const resposta = require('../../config/rotinas');

module.exports.delete = async function(id, req, res){
    let retorno = await usuarioLogAcesso.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await usuarioLogAcesso.post(dados);
    resposta.montaRetorno(retorno, req, res);
}