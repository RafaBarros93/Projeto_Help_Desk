const rotas = require('../../config/routes');
const rfp = require('../controllers/rfp');

module.exports = function(){

     rotas.get('/rfp/:macroProcesso/:empresa', function(req, res){
         rfp.get(req.params.macroProcesso, req.params.empresa, req, res);
     });
 
     rotas.get('/rfp/empresa', function(req, res){
        rfp.getEmpresa(req, res);
     });

     rotas.get('/rfp/processos/listar/:empresa', function(req, res){
        rfp.getMacroProcesso(req.params.empresa, req, res);
     });

     rotas.put('/rfp', function(req, res){
        rfp.put(req.body, req, res);
     });
}