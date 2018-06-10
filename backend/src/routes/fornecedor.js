const rotas = require('../../config/routes');
const fornecedor = require('../controllers/fornecedor');

module.exports = function(){

     rotas.get('/fornecedor', function(req, res){
         fornecedor.get(req, res);
     });
}