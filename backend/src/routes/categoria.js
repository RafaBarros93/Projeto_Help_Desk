const rotas = require('../../config/routes');
const categoria = require('../controllers/categoria');

module.exports = function(){

     rotas.get('/categoria/:id', function(req, res){
        categoria.get(req.params.id, req, res);
     });
 
     rotas.get('/categoria', function(req, res){
        categoria.get(null, req, res);
     });
}