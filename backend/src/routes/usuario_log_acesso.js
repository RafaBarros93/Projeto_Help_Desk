const rotas = require('../../config/routes');
const usuarioLogAcesso = require('../controllers/usuario_log_acesso');

module.exports = function(){
 
     rotas.post('/usuarioLogAcesso', function(req, res){
         usuarioLogAcesso.post(req.body, req, res);
     });
 
     rotas.delete('/usuarioLogAcesso/:id', function(req, res){
        usuarioLogAcesso.delete(req.params.id, req, res);
     });   
}