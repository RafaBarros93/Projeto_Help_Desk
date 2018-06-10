const rotas = require('../../config/routes');
const pagina = require('../controllers/pagina');

module.exports = function(){

     rotas.get('/pagina/:id', function(req, res){
         pagina.get(req.params.id, req, res);
     });
 
     rotas.get('/pagina', function(req, res){
        pagina.get(null, req, res);
     });
 
     rotas.post('/pagina', function(req, res){
         pagina.post(req.body, req, res);
     });
 
     rotas.put('/pagina', function(req, res){
        pagina.put(req.body, req, res);
     });
 
     rotas.delete('/pagina/:id', function(req, res){
        pagina.delete(req.params.id, req, res);
     });   
}