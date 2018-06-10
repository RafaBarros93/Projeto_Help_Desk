const rotas = require('../../config/routes');
const grupoOrcamentoDespesa = require('../controllers/grupo_orcamento_despesa');

module.exports = function(){

     rotas.get('/grupoOrcamentoDespesa/:coligada/:centroCusto', function(req, res){
         grupoOrcamentoDespesa.get(req.params.coligada, req.params.centroCusto, req, res);
     });
}