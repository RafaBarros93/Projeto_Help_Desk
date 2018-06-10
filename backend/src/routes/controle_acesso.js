const rotas = require('../../config/routes');
const controleAcesso = require('../controllers/controle_acesso');

module.exports = function(){

     rotas.get('/controleAcesso/:grupo', function(req, res){
         controleAcesso.get(req.params.grupo, null, req, res);
     });
 
     rotas.get('/controleAcesso/:grupo/:menu', function(req, res){
        controleAcesso.get(req.params.grupo, req.params.menu, req, res);
     });
 
     rotas.post('/controleAcesso', function(req, res){
         controleAcesso.post(req.body, req, res);
     });
 
     rotas.delete('/controleAcesso/:id', function(req, res){
        controleAcesso.delete(req.params.id, req, res);
     });
     
     rotas.get('/montaMenu/:grupo', function(req, res){
        controleAcesso.montaMenu(req.params.grupo, req, res);
    });
}