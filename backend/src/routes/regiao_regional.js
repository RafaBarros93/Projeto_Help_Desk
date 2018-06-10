const rotas = require('../../config/routes');
const regiaoRegional = require('../controllers/regiao_regional');

module.exports = function(){

     rotas.get('/regiaoRegional/:id', function(req, res){
         regiaoRegional.get(req.params.id, req, res);
     });
 
     rotas.get('/regiaoRegional', function(req, res){
        regiaoRegional.get(null, req, res);
     });
 
     rotas.post('/regiaoRegional', function(req, res){
         regiaoRegional.post(req.body, req, res);
     });
 
     rotas.put('/regiaoRegional', function(req, res){
        regiaoRegional.put(req.body, req, res);
     });
 
     rotas.delete('/regiaoRegional/:id', function(req, res){
        regiaoRegional.delete(req.params.id, req, res);
     });   
}