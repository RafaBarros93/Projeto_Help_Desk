const rotas = require('../../config/routes');
const tipoContingencia = require('../controllers/tipo_contingencia');

module.exports = function(){

     rotas.get('/tipoContingencia/:id', function(req, res){
         tipoContingencia.get(req.params.id, req, res);
     });
 
     rotas.get('/tipoContingencia', function(req, res){
        tipoContingencia.get(null, req, res);
     });
 
     rotas.post('/tipoContingencia', function(req, res){
         tipoContingencia.post(req.body, req, res);
     });
 
     rotas.put('/tipoContingencia', function(req, res){
        tipoContingencia.put(req.body, req, res);
     });
 
     rotas.delete('/tipoContingencia/:id', function(req, res){
        tipoContingencia.delete(req.params.id, req, res);
     });   
}