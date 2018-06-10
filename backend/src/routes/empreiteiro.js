const rotas = require('../../config/routes');
const empreiteiro = require('../controllers/empreiteiro');

module.exports = function(){

     rotas.get('/empreiteiro/:id', function(req, res){
         empreiteiro.get(req.params.id, req, res);
     });
 
     rotas.get('/empreiteiro', function(req, res){
        empreiteiro.get(null, req, res);
     });
 
     rotas.post('/empreiteiro', function(req, res){
         empreiteiro.post(req.body, req, res);
     });
 
     rotas.put('/empreiteiro', function(req, res){
        empreiteiro.put(req.body, req, res);
     });
 
     rotas.delete('/empreiteiro/:id', function(req, res){
        empreiteiro.delete(req.params.id, req, res);
     });   
}