const rotas = require('../../config/routes');
const areaDireito = require('../controllers/area_direito');

module.exports = function(){

     rotas.get('/areaDireito/:id', function(req, res){
         areaDireito.get(req.params.id, req, res);
     });
 
     rotas.get('/areaDireito', function(req, res){
        areaDireito.get(null, req, res);
     });
 
     rotas.post('/areaDireito', function(req, res){
         areaDireito.post(req.body, req, res);
     });
 
     rotas.put('/areaDireito', function(req, res){
        areaDireito.put(req.body, req, res);
     });
 
     rotas.delete('/areaDireito/:id', function(req, res){
        areaDireito.delete(req.params.id, req, res);
     });   
}