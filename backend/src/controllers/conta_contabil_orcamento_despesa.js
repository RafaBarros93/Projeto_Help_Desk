const contaContabilOrcamentoDespesa = require('../models/conta_contabil_orcamento_despesa');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, centroCusto, grupo, contaOrcamento, req, res){
    let retorno = await contaContabilOrcamentoDespesa.get(coligada, centroCusto, grupo, contaOrcamento);
    resposta.montaRetorno(retorno, req, res);
}
