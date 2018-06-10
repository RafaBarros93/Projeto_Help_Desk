const rotas = require('../../config/routes');
const cargo = require('../controllers/cargo');

module.exports = function(){

     rotas.get('/cargos', function(req, res){
         cargo.get(req, res);
     });
}