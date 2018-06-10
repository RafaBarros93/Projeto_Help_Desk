const rotas = require('../../config/routes');
const formaParticipacaoEmpresa = require('../controllers/forma_participacao_empresa');

module.exports = function(){

     rotas.get('/formaParticipacaoEmpresa/:id', function(req, res){
         formaParticipacaoEmpresa.get(req.params.id, req, res);
     });
 
     rotas.get('/formaParticipacaoEmpresa', function(req, res){
        formaParticipacaoEmpresa.get(null, req, res);
     });
 
     rotas.post('/formaParticipacaoEmpresa', function(req, res){
         formaParticipacaoEmpresa.post(req.body, req, res);
     });
 
     rotas.put('/formaParticipacaoEmpresa', function(req, res){
        formaParticipacaoEmpresa.put(req.body, req, res);
     });
 
     rotas.delete('/formaParticipacaoEmpresa/:id', function(req, res){
        formaParticipacaoEmpresa.delete(req.params.id, req, res);
     });   
}