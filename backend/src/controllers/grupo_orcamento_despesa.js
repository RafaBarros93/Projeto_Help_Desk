const grupoOrcamentoDespesa = require('../models/grupo_orcamento_despesa');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, centroCusto, req, res){
    let retorno = await grupoOrcamentoDespesa.get(coligada, centroCusto);
    resposta.montaRetorno(retorno, req, res);
}