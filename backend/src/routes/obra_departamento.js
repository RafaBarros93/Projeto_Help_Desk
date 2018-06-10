const rotas = require('../../config/routes');
const obraDepartamento = require('../controllers/obra_departamento');

module.exports = function(){

     rotas.get('/obraDepartamento/:id', function(req, res){
         obraDepartamento.get(req.params.id, req, res);
     });
 
     rotas.get('/obraDepartamento', function(req, res){
        obraDepartamento.get(null, req, res);
     });
 
     rotas.post('/obraDepartamento', function(req, res){
         obraDepartamento.post(req.body, req, res);
     });
 
     rotas.put('/obraDepartamento', function(req, res){
        obraDepartamento.put(req.body, req, res);
     });
 
     rotas.delete('/obraDepartamento/:id', function(req, res){
        obraDepartamento.delete(req.params.id, req, res);
     });   
}