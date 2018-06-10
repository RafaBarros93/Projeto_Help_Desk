const rotas = require('../../config/routes');
const premissaColigada = require('../controllers/premissa_coligada');

module.exports = function(){

     rotas.get('/premissas/:coligada', function(req, res){
        premissaColigada.get(req.params.coligada, req, res);
     });

     rotas.post('/premissas', function(req, res){
        premissaColigada.post(req.body, req, res);
    });
}