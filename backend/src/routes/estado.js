const rotas = require('../../config/routes');
const estado = require('../controllers/estado');

module.exports = function(){

     rotas.get('/estado/:id', function(req, res){
         estado.get(req.params.id, req, res);
     });
 
     rotas.get('/estado', function(req, res){
        estado.get(null, req, res);
     });
 
     rotas.post('/estado', function(req, res){
         estado.post(req.body, req, res);
     });
 
     rotas.put('/estado', function(req, res){
        estado.put(req.body, req, res);
     });
 
     rotas.delete('/estado/:id', function(req, res){
        estado.delete(req.params.id, req, res);
     });   
}