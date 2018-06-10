const rotas = require('../../config/routes');
const funcionarioFolha = require('../controllers/funcionario_folha');

module.exports = function(){

     rotas.get('/funcionarios', function(req, res){
         funcionarioFolha.get(req, res);
     });
 
     rotas.post('/funcionarios', function(req, res){
         funcionarioFolha.post(req.body, req, res);
     });
 
     rotas.put('/funcionarios', function(req, res){
        funcionarioFolha.put(req.body, req, res);
     });   

     rotas.delete('/funcionarios', function(req, res){
        funcionarioFolha.delete(req.body, req, res);
     });   
}