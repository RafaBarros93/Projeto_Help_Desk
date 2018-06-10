const rotas = require('../../config/routes');
const menu = require('../controllers/menu');

module.exports = function(){

     rotas.get('/menu/:id', function(req, res){
         menu.get(req.params.id, req, res);
     });
 
     rotas.get('/menu', function(req, res){
        menu.get(null, req, res);
     });
 
     rotas.post('/menu', function(req, res){
         menu.post(req.body, req, res);
     });
 
     rotas.put('/menu', function(req, res){
        menu.put(req.body, req, res);
     });
 
     rotas.delete('/menu/:id', function(req, res){
        menu.delete(req.params.id, req, res);
     });   
}