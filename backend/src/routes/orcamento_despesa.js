const rotas = require('../../config/routes');
const orcamentoDespesa = require('../controllers/orcamento_despesa');

module.exports = function(){

     rotas.get('/orcamentoDespesa/:coligada/:centroCusto/:grupo/:contaOrcamento/:contaContabil/:ano', function(req, res){
         orcamentoDespesa.get(req.params.coligada, req.params.centroCusto, req.params.grupo, 
                              req.params.contaOrcamento, req.params.contaContabil, req.params.ano, req, res);
     });
 
     rotas.post('/orcamentoDespesa', function(req, res){
         orcamentoDespesa.post(req.body, req, res);
     });
 
     rotas.put('/orcamentoDespesa', function(req, res){
        orcamentoDespesa.put(req.body, req, res);
     });
 
     rotas.delete('/orcamentoDespesa/:id', function(req, res){
        orcamentoDespesa.delete(req.params.id, req, res);
     });   

     rotas.get('/valorRazao/:coligada/:centroCusto/:grupo/:contaOrcamento/:contaContabil', function(req, res){
        orcamentoDespesa.valorRazao(req.params.coligada, req.params.centroCusto, req.params.grupo, 
                                    req.params.contaOrcamento, req.params.contaContabil, req, res);
     });   
}