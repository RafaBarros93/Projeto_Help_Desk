const rotas = require('../../config/routes');
const subAreaDireito = require('../controllers/sub_area_direito');

module.exports = function(){

     rotas.get('/subAreaDireito/:id', function(req, res){
         subAreaDireito.get(req.params.id, req, res);
     });
 
     rotas.get('/subAreaDireito', function(req, res){
        subAreaDireito.get(null, req, res);
     });
 
     rotas.post('/subAreaDireito', function(req, res){
         subAreaDireito.post(req.body, req, res);
     });
 
     rotas.put('/subAreaDireito', function(req, res){
        subAreaDireito.put(req.body, req, res);
     });
 
     rotas.delete('/subAreaDireito/:id', function(req, res){
        subAreaDireito.delete(req.params.id, req, res);
     });   
}