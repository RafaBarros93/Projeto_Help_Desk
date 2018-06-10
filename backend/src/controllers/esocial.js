const esocial = require('../models/esocial');
const resposta = require('../../config/rotinas');

module.exports.listarCadastro = async function(cpf, req, res){
    let retorno = await esocial.getCadastro(cpf);
    let dependentes = await esocial.getDependente(retorno.result[0].Chapa, retorno.result[0].CodigoColigada);
    retorno.result[0].Dependentes = dependentes.result;
    resposta.montaRetorno(retorno, req, res);
}

module.exports.listarDependente = async function(chapa, coligada, req, res){
    let retorno = await esocial.getDependente(chapa, coligada);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.putCadastro = async function(cadastro, req, res){
    let dependentes = cadastro.Dependentes;
    cadastro.Dependentes = null;
    let retorno = await esocial.putCadastro(cadastro);
    let retornoDelete = await esocial.deleteDependente(cadastro.Chapa, cadastro.CodigoColigada);
    for (let i = 0; i < dependentes.length; i++){
        let retornoDependente = await esocial.postDependente(dependentes[i]);
    }
    resposta.montaRetorno(retorno, req, res);
}