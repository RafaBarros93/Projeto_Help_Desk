const rotas = require('../../config/routes');
const contaContabilOrcamentoDespesa = require('../controllers/conta_contabil_orcamento_despesa');

module.exports = function(){

     rotas.get('/contaContabilOrcamentoDespesa/:coligada/:centroCusto/:grupo/:contaOrcamento', function(req, res){
         contaContabilOrcamentoDespesa.get(req.params.coligada, req.params.centroCusto, req.params.grupo, req.params.contaOrcamento, req, res);
     });
}