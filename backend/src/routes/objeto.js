const rotas = require('../../config/routes');
const objeto = require('../controllers/objeto');

module.exports = function(){

     rotas.get('/objeto/:id', function(req, res){
         objeto.get(req.params.id, req, res);
     });
 
     rotas.get('/objeto', function(req, res){
        objeto.get(null, req, res);
     });
 
     rotas.post('/objeto', function(req, res){
         objeto.post(req.body, req, res);
     });
 
     rotas.put('/objeto', function(req, res){
        objeto.put(req.body, req, res);
     });
 
     rotas.delete('/objeto/:id', function(req, res){
        objeto.delete(req.params.id, req, res);
     });   
}