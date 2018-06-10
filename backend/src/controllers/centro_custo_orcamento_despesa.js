const centroCustoOrcamentoDespesa = require('../models/centro_custo_orcamento_despesa');
const resposta = require('../../config/rotinas');

module.exports.get = async function(coligada, req, res){
    let retorno = await centroCustoOrcamentoDespesa.get(coligada);
    resposta.montaRetorno(retorno, req, res);
}