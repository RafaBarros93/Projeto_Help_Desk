const rotas = require('../../config/routes');
const varaLocal = require('../controllers/vara_local');

module.exports = function(){

     rotas.get('/varaLocal/:id', function(req, res){
         varaLocal.get(req.params.id, req, res);
     });
 
     rotas.get('/varaLocal', function(req, res){
        varaLocal.get(null, req, res);
     });
 
     rotas.post('/varaLocal', function(req, res){
         varaLocal.post(req.body, req, res);
     });
 
     rotas.put('/varaLocal', function(req, res){
        varaLocal.put(req.body, req, res);
     });
 
     rotas.delete('/varaLocal/:id', function(req, res){
        varaLocal.delete(req.params.id, req, res);
     });   
}