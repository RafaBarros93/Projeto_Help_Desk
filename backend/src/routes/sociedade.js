const rotas = require('../../config/routes');
const sociedade = require('../controllers/sociedade');

module.exports = function(){

     rotas.get('/sociedade/:id', function(req, res){
         sociedade.get(req.params.id, req, res);
     });
 
     rotas.get('/sociedade', function(req, res){
        sociedade.get(null, req, res);
     });
 
     rotas.post('/sociedade', function(req, res){
         sociedade.post(req.body, req, res);
     });
 
     rotas.put('/sociedade', function(req, res){
        sociedade.put(req.body, req, res);
     });
 
     rotas.delete('/sociedade/:id', function(req, res){
        sociedade.delete(req.params.id, req, res);
     });   
}