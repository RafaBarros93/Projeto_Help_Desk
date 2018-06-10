const dashboard = require('../models/dashboard');
const resposta = require('../../config/rotinas');

module.exports.get = async function(req, res){
    let retorno = await dashboard.get();
    resposta.montaRetorno(retorno, req, res);
}

module.exports.getURLPowerBI = async function(id, req, res){
    let retorno = await dashboard.getURLPowerBI(id);
    resposta.montaRetorno(retorno, req, res);
}