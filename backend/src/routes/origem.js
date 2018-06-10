const rotas = require('../../config/routes');
const origem = require('../controllers/origem');

module.exports = function(){

     rotas.get('/origem/:id', function(req, res){
         origem.get(req.params.id, req, res);
     });
 
     rotas.get('/origem', function(req, res){
        origem.get(null, req, res);
     });
 
     rotas.post('/origem', function(req, res){
         origem.post(req.body, req, res);
     });
 
     rotas.put('/origem', function(req, res){
        origem.put(req.body, req, res);
     });
 
     rotas.delete('/origem/:id', function(req, res){
        origem.delete(req.params.id, req, res);
     });   
}