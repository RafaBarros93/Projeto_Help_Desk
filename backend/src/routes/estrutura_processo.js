const rotas = require('../../config/routes');
const estruturaProcesso = require('../controllers/estrutura_processo');

module.exports = function(){

     rotas.get('/estruturaProcesso/:id', function(req, res){
         estruturaProcesso.get(req.params.id, req, res);
     });
 
     rotas.get('/estruturaProcesso', function(req, res){
        estruturaProcesso.get(null, req, res);
     });
}