const rotas = require('../../config/routes');
const chamado = require('../controllers/chamado');

module.exports = function(){

     rotas.get('/chamado/:id', function(req, res){
        chamado.get(req.params.id, req, res);
     });
 
     rotas.get('/chamado', function(req, res){
        chamado.get(null, req, res);
     });
 
     rotas.post('/chamado', function(req, res){
        chamado.post(req.body, req, res);
     });
 
     rotas.put('/chamado', function(req, res){
        chamado.put(req.body, req, res);
     });
 
     rotas.delete('/chamado/:id', function(req, res){
        chamado.delete(req.params.id, req, res);
     });   
}