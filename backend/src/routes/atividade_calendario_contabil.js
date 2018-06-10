const rotas = require('../../config/routes');
const atividadeCalendarioContabil = require('../controllers/atividade_calendario_contabil');

module.exports = function(){
 
     rotas.get('/atividadeCalendarioContabil', function(req, res){
        atividadeCalendarioContabil.get(req, res);
     });
 
     rotas.post('/atividadeCalendarioContabil', function(req, res){
         atividadeCalendarioContabil.post(req.body, req, res);
     });
 
     rotas.put('/atividadeCalendarioContabil', function(req, res){
        atividadeCalendarioContabil.put(req.body, req, res);
     });
 
     rotas.delete('/atividadeCalendarioContabil/:id', function(req, res){
        atividadeCalendarioContabil.delete(req.params.id, req, res);
     });   

     rotas.get('/calendarioContabil', function(req, res){
        atividadeCalendarioContabil.getCalendario(req, res);
     });
}