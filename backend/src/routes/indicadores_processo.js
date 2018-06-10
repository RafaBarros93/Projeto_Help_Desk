const rotas = require('../../config/routes');
const indicadoresProcesso = require('../controllers/indicadores_processo');

module.exports = function(){

     rotas.get('/indicadoresProcesso/:id', function(req, res){
         indicadoresProcesso.get(req.params.id, req, res);
     });
 
     rotas.get('/indicadoresProcesso', function(req, res){
        indicadoresProcesso.get(null, req, res);
     });
 
     rotas.post('/indicadoresProcesso', function(req, res){
         indicadoresProcesso.post(req.body, req, res);
     });
 
     rotas.put('/indicadoresProcesso', function(req, res){
        indicadoresProcesso.put(req.body, req, res);
     });
 
     rotas.delete('/indicadoresProcesso/:id', function(req, res){
        indicadoresProcesso.delete(req.params.id, req, res);
     });   
}