const orcamentoDespesa = require('../models/orcamento_despesa');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, centroCusto, grupo, contaOrcamento, contaContabil, ano, req, res){
    let retorno = await orcamentoDespesa.get(coligada, centroCusto, grupo, contaOrcamento, contaContabil, ano);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await orcamentoDespesa.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await orcamentoDespesa.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await orcamentoDespesa.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.valorRazao = async function(coligada, centroCusto, grupo, contaOrcamento, contaContabil, req, res){
    let retorno = await orcamentoDespesa.post(coligada, centroCusto, grupo, contaOrcamento, contaContabil);
    resposta.montaRetorno(retorno, req, res);
}