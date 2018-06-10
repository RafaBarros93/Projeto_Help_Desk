const rotas = require('../../config/routes');
const probabilidadePerda = require('../controllers/probabilidade_perda');

module.exports = function(){

     rotas.get('/probabilidadePerda/:id', function(req, res){
         probabilidadePerda.get(req.params.id, req, res);
     });
 
     rotas.get('/probabilidadePerda', function(req, res){
        probabilidadePerda.get(null, req, res);
     });
 
     rotas.post('/probabilidadePerda', function(req, res){
         probabilidadePerda.post(req.body, req, res);
     });
 
     rotas.put('/probabilidadePerda', function(req, res){
        probabilidadePerda.put(req.body, req, res);
     });
 
     rotas.delete('/probabilidadePerda/:id', function(req, res){
        probabilidadePerda.delete(req.params.id, req, res);
     });   
}