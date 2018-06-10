const rotas = require('../../config/routes');
const tipoAcao = require('../controllers/tipo_acao');

module.exports = function(){

     rotas.get('/tipoAcao/:id', function(req, res){
         tipoAcao.get(req.params.id, req, res);
     });
 
     rotas.get('/tipoAcao', function(req, res){
        tipoAcao.get(null, req, res);
     });
 
     rotas.post('/tipoAcao', function(req, res){
         tipoAcao.post(req.body, req, res);
     });
 
     rotas.put('/tipoAcao', function(req, res){
        tipoAcao.put(req.body, req, res);
     });
 
     rotas.delete('/tipoAcao/:id', function(req, res){
        tipoAcao.delete(req.params.id, req, res);
     });   
}