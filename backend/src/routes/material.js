const rotas = require('../../config/routes');
const material = require('../controllers/material');

module.exports = function(){

     rotas.get('/material', function(req, res){
         material.get(req, res);
     });
}