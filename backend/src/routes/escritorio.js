const rotas = require('../../config/routes');
const escritorio = require('../controllers/escritorio');

module.exports = function(){

     rotas.get('/escritorio/:id', function(req, res){
         escritorio.get(req.params.id, req, res);
     });
 
     rotas.get('/escritorio', function(req, res){
        escritorio.get(null, req, res);
     });
 
     rotas.post('/escritorio', function(req, res){
         escritorio.post(req.body, req, res);
     });
 
     rotas.put('/escritorio', function(req, res){
        escritorio.put(req.body, req, res);
     });
 
     rotas.delete('/escritorio/:id', function(req, res){
        escritorio.delete(req.params.id, req, res);
     });   
}