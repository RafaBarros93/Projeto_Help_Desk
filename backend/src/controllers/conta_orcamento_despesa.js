const contaOrcamentoDespesa = require('../models/conta_orcamento_despesa');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, centroCusto, grupo, req, res){
    let retorno = await contaOrcamentoDespesa.get(coligada, centroCusto, grupo);
    resposta.montaRetorno(retorno, req, res);
}
