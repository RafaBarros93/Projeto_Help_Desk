const rotas = require('../../config/routes');
const contaOrcamentoDespesa = require('../controllers/conta_orcamento_despesa');

module.exports = function(){

     rotas.get('/contaOrcamentoDespesa/:coligada/:centroCusto/:grupo', function(req, res){
         contaOrcamentoDespesa.get(req.params.coligada, req.params.centroCusto, req.params.grupo, req, res);
     });
}