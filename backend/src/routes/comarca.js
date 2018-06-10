const rotas = require('../../config/routes');
const comarca = require('../controllers/comarca');

module.exports = function(){

     rotas.get('/comarca/:id', function(req, res){
         comarca.get(req.params.id, req, res);
     });
 
     rotas.get('/comarca', function(req, res){
        comarca.get(null, req, res);
     });
 
     rotas.post('/comarca', function(req, res){
         comarca.post(req.body, req, res);
     });
 
     rotas.put('/comarca', function(req, res){
        comarca.put(req.body, req, res);
     });
 
     rotas.delete('/comarca/:id', function(req, res){
        comarca.delete(req.params.id, req, res);
     });   
}