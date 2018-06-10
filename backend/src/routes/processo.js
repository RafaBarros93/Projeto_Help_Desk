const rotas = require('../../config/routes');
const processo = require('../controllers/processo');

module.exports = function(){

     rotas.get('/processo/:id', function(req, res){
         processo.get(req.params.id, req, res);
     });
 
     rotas.get('/processo', function(req, res){
        processo.get(null, req, res);
     });
 
     rotas.post('/processo', function(req, res){
         processo.post(req.body, req, res);
     });
 
     rotas.put('/processo', function(req, res){
        processo.put(req.body, req, res);
     });
 
     rotas.delete('/processo/:id', function(req, res){
        processo.delete(req.params.id, req, res);
     });   
}