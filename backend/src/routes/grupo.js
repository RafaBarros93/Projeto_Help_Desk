const rotas = require('../../config/routes');
const grupo = require('../controllers/grupo');

module.exports = function(){

     rotas.get('/grupo/:id', function(req, res){
         grupo.get(req.params.id, req, res);
     });
 
     rotas.get('/grupo', function(req, res){
        grupo.get(null, req, res);
     });
 
     rotas.post('/grupo', function(req, res){
         grupo.post(req.body, req, res);
     });
 
     rotas.put('/grupo', function(req, res){
        grupo.put(req.body, req, res);
     });
 
     rotas.delete('/grupo/:id', function(req, res){
        grupo.delete(req.params.id, req, res);
     });   
}