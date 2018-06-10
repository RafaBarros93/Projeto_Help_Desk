const rotas = require('../../config/routes');
const acompanhamento = require('../controllers/acompanhamento');

module.exports = function(){

     rotas.get('/acompanhamento', function(req, res){
         acompanhamento.get(req, res);
     });
 
     rotas.post('/acompanhamento', function(req, res){
         acompanhamento.post(req.body, req, res);
     });
 
     rotas.put('/acompanhamento', function(req, res){
        acompanhamento.put(req.body, req, res);
     });
 
     rotas.delete('/acompanhamento/:id', function(req, res){
        acompanhamento.delete(req.params.id, req, res);
     });   
}