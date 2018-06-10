const usuario = require('../models/usuario');
const resposta = require('../../config/rotinas');

module.exports.get = async function(id, req, res){
    let retorno = await usuario.get(id);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await usuario.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await usuario.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await usuario.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.validaLogin = async function(login, req, res){

    let retorno = {};
    if((login.email != undefined) && (login.senha != undefined)){
        retorno = await usuario.validaLogin(login);
        if(retorno.linhasAfetadas <= 0) {
            retorno.mensage = 'Credenciais inválida';    
        }
    } else {
        retorno.mensage = 'Credenciais inválida';
    }
    resposta.montaRetorno(retorno, req, res);
}