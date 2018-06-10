const rotas = require('../../config/routes');
const fase = require('../controllers/fase');

module.exports = function(){

     rotas.get('/fase/:id', function(req, res){
         fase.get(req.params.id, req, res);
     });
 
     rotas.get('/fase', function(req, res){
        fase.get(null, req, res);
     });
 
     rotas.post('/fase', function(req, res){
         fase.post(req.body, req, res);
     });
 
     rotas.put('/fase', function(req, res){
        fase.put(req.body, req, res);
     });
 
     rotas.delete('/fase/:id', function(req, res){
        fase.delete(req.params.id, req, res);
     });   
}