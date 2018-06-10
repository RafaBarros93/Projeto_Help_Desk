const rotas = require('../../config/routes');
const oportunidadeProblema = require('../controllers/oportunidade_problema');

module.exports = function(){

     rotas.get('/oportunidadeProblema/:id', function(req, res){
         oportunidadeProblema.get(req.params.id, req, res);
     });
 
     rotas.get('/oportunidadeProblema', function(req, res){
        oportunidadeProblema.get(null, req, res);
     });
 
     rotas.post('/oportunidadeProblema', function(req, res){
         oportunidadeProblema.post(req.body, req, res);
     });
 
     rotas.put('/oportunidadeProblema', function(req, res){
        oportunidadeProblema.put(req.body, req, res);
     });
 
     rotas.delete('/oportunidadeProblema/:id', function(req, res){
        oportunidadeProblema.delete(req.params.id, req, res);
     });   
}