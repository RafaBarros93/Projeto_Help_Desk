const rotas = require('../../config/routes');
const propostaTecnica = require('../controllers/proposta_tecnica');

module.exports = function(){

     rotas.get('/propostaTecnica/:empreendimento/:fornecedor/:material/:valor', function(req, res){
         propostaTecnica.get(req.params.empreendimento, req.params.fornecedor, req.params.material, req.params.valor, req, res);
     });
 
     rotas.post('/propostaTecnica', function(req, res){
         propostaTecnica.post(req.body, req, res);
     });

     rotas.post('/propostaTecnica/escolherProposta', function(req, res){
        propostaTecnica.escolherProposta(req.body, req, res);
    });
 
     rotas.put('/propostaTecnica', function(req, res){
        propostaTecnica.put(req.body, req, res);
     });
 
     rotas.delete('/propostaTecnica/:id', function(req, res){
        propostaTecnica.delete(req.params.id, req, res);
     });   
}