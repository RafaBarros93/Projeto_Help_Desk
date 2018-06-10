const rotas = require('../../config/routes');
const subProcesso = require('../controllers/sub_processo');

module.exports = function(){

     rotas.get('/subProcesso/:id', function(req, res){
         subProcesso.get(req.params.id, req, res);
     });
 
     rotas.get('/subProcesso', function(req, res){
        subProcesso.get(null, req, res);
     });
 
     rotas.post('/subProcesso', function(req, res){
         subProcesso.post(req.body, req, res);
     });
 
     rotas.put('/subProcesso', function(req, res){
        subProcesso.put(req.body, req, res);
     });
 
     rotas.delete('/subProcesso/:id', function(req, res){
        subProcesso.delete(req.params.id, req, res);
     });   
}