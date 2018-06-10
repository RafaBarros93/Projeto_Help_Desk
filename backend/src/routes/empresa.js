const rotas = require('../../config/routes');
const empresa = require('../controllers/empresa');

module.exports = function(){

     rotas.get('/empresa/:id', function(req, res){
         empresa.get(req.params.id, req, res);
     });
 
     rotas.get('/empresa', function(req, res){
        empresa.get(null, req, res);
     });
 
     rotas.post('/empresa', function(req, res){
         empresa.post(req.body, req, res);
     });
 
     rotas.put('/empresa', function(req, res){
        empresa.put(req.body, req, res);
     });
 
     rotas.delete('/empresa/:id', function(req, res){
        empresa.delete(req.params.id, req, res);
     });   
}