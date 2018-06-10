const rotas = require('../../config/routes');
const centroCustoOrcamentoDespesa = require('../controllers/centro_custo_orcamento_despesa');

module.exports = function(){

     rotas.get('/centroCustoOrcamentoDespesa/:coligada', function(req, res){
         centroCustoOrcamentoDespesa.get(req.params.coligada, req, res);
     });
}