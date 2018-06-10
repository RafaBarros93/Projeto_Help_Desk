const rotas = require('../../config/routes');
const status = require('../controllers/status');

module.exports = function(){

     rotas.get('/status/:id', function(req, res){
         status.get(req.params.id, req, res);
     });
 
     rotas.get('/status', function(req, res){
        status.get(null, req, res);
     });
 
     rotas.post('/status', function(req, res){
         status.post(req.body, req, res);
     });
 
     rotas.put('/status', function(req, res){
        status.put(req.body, req, res);
     });
 
     rotas.delete('/status/:id', function(req, res){
        status.delete(req.params.id, req, res);
     });   
}