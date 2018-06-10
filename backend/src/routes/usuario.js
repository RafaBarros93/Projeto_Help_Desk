const rotas = require('../../config/routes');
const usuario = require('../controllers/usuario');

module.exports = function(){

    rotas.get('/login', function(req, res){
        let login = {
            email: '',
            senha: ''
        }
        
        //captura os dados do login no header
        login.email = req.headers['email'];
        login.senha = req.headers['senha'];

        usuario.validaLogin(login, req, res);
     });
 
     rotas.get('/usuario/:id', function(req, res){
         usuario.get(req.params.id, req, res);
     });
 
     rotas.get('/usuario', function(req, res){
        usuario.get(null, req, res);
     });
 
     rotas.post('/usuario', function(req, res){
         usuario.post(req.body, req, res);
     });
 
     rotas.put('/usuario', function(req, res){
        usuario.put(req.body, req, res);
     });
 
     rotas.delete('/usuario/:id', function(req, res){
        usuario.delete(req.params.id, req, res);
     });   
}