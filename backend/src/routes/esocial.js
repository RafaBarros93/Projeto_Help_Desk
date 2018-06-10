const rotas = require('../../config/routes');
const esocial = require('../controllers/esocial');

module.exports = function(){

     rotas.get('/esocial/:cpf', function(req, res){
        esocial.listarCadastro(req.params.cpf, req, res);
     });
 
     rotas.put('/esocial', function(req, res){
        esocial.putCadastro(req.body, req, res);
     });
}