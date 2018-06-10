const rotas = require('../../config/routes');
const advogado = require('../controllers/advogado');

module.exports = function(){

     rotas.get('/advogado/:id', function(req, res){
         advogado.get(req.params.id, req, res);
     });
 
     rotas.get('/advogado', function(req, res){
        advogado.get(null, req, res);
     });
 
     rotas.post('/advogado', function(req, res){
         advogado.post(req.body, req, res);
     });
 
     rotas.put('/advogado', function(req, res){
        advogado.put(req.body, req, res);
     });
 
     rotas.delete('/advogado/:id', function(req, res){
        advogado.delete(req.params.id, req, res);
     });   
}