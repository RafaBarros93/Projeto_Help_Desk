const rotas = require('../../config/routes');
const coligada = require('../controllers/coligada');

module.exports = function(){

     rotas.get('/coligadas', function(req, res){
         coligada.get(req, res);
     });
}