const rotas = require('../../config/routes');
const grupoUsuario = require('../controllers/grupo_usuario');

module.exports = function(){

     rotas.get('/grupoUsuario/:id', function(req, res){
         grupoUsuario.get(req.params.id, req, res);
     });
 
     rotas.get('/grupoUsuario', function(req, res){
        grupoUsuario.get(null, req, res);
     });
 
     rotas.post('/grupoUsuario', function(req, res){
         grupoUsuario.post(req.body, req, res);
     });
 
     rotas.put('/grupoUsuario', function(req, res){
        grupoUsuario.put(req.body, req, res);
     });
 
     rotas.delete('/grupoUsuario/:id', function(req, res){
        grupoUsuario.delete(req.params.id, req, res);
     });   
}