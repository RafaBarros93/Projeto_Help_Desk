const rotas = require('../../config/routes');
const esfera = require('../controllers/esfera');

module.exports = function(){

     rotas.get('/esfera/:id', function(req, res){
         esfera.get(req.params.id, req, res);
     });
 
     rotas.get('/esfera', function(req, res){
        esfera.get(null, req, res);
     });
 
     rotas.post('/esfera', function(req, res){
         esfera.post(req.body, req, res);
     });
 
     rotas.put('/esfera', function(req, res){
        esfera.put(req.body, req, res);
     });
 
     rotas.delete('/esfera/:id', function(req, res){
        esfera.delete(req.params.id, req, res);
     });   
}