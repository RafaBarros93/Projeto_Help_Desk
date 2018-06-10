const rotas = require('../../config/routes');
const processoAditivo = require('../controllers/processo_aditivo');

module.exports = function(){

     rotas.get('/processoAditivo/:id', function(req, res){
         processoAditivo.get(req.params.id, req, res);
     });
 
     rotas.post('/processoAditivo', function(req, res){
         processoAditivo.post(req.body, req, res);
     });
 
     rotas.delete('/processoAditivo/:id', function(req, res){
        processoAditivo.delete(req.params.id, req, res);
     });   
}