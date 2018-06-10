const rotas = require('../../config/routes');
const funcaoAlegada = require('../controllers/funcao_alegada');

module.exports = function(){

     rotas.get('/funcaoAlegada/:id', function(req, res){
         funcaoAlegada.get(req.params.id, req, res);
     });
 
     rotas.get('/funcaoAlegada', function(req, res){
        funcaoAlegada.get(null, req, res);
     });
 
     rotas.post('/funcaoAlegada', function(req, res){
         funcaoAlegada.post(req.body, req, res);
     });
 
     rotas.put('/funcaoAlegada', function(req, res){
        funcaoAlegada.put(req.body, req, res);
     });
 
     rotas.delete('/funcaoAlegada/:id', function(req, res){
        funcaoAlegada.delete(req.params.id, req, res);
     });   
}