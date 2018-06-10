const rotas = require('../../config/routes');
const planoAcao = require('../controllers/plano_acao');

module.exports = function(){

     rotas.get('/planoAcao/:id', function(req, res){
         planoAcao.get(req.params.id, req, res);
     });
 
     rotas.get('/planoAcao', function(req, res){
        planoAcao.get(null, req, res);
     });
 
     rotas.post('/planoAcao', function(req, res){
         planoAcao.post(req.body, req, res);
     });
 
     rotas.put('/planoAcao', function(req, res){
        planoAcao.put(req.body, req, res);
     });
 
     rotas.delete('/planoAcao/:id', function(req, res){
        planoAcao.delete(req.params.id, req, res);
     });   
}