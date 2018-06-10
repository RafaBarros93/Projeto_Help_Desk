const rotas = require('../../config/routes');
const diretoria = require('../controllers/diretoria');

module.exports = function(){

     rotas.get('/diretorias', function(req, res){
         diretoria.get(req, res);
     });
}