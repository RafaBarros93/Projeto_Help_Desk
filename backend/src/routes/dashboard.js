const rotas = require('../../config/routes');
const dashboard = require('../controllers/dashboard');

module.exports = function(){

     rotas.get('/dashboards/:id', function(req, res){
         dashboard.getURLPowerBI(req.params.id, req, res);
     });
 
     rotas.get('/dashboards', function(req, res){
        dashboard.get(req, res); 
     });
}