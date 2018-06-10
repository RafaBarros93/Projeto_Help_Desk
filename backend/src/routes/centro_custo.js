const rotas = require('../../config/routes');
const centroCusto = require('../controllers/centro_custo');

module.exports = function(){

     rotas.get('/centroCustos', function(req, res){
        centroCusto.get(req, res);
     });
}