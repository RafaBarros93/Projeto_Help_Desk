const rotas = require('../../config/routes');
const funcionarioStatus = require('../controllers/funcionario_status');

module.exports = function(){

     rotas.get('/funcionarioStatus', function(req, res){
         funcionarioStatus.get(req, res);
     });
}