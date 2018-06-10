const controleAcesso = require('../models/controle_acesso');
const resposta = require('../../config/rotinas');

module.exports.get = async function(grupo, menu, req, res){
    let retorno = await controleAcesso.get(grupo, menu);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await controleAcesso.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await controleAcesso.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.montaMenu = async function(grupo, req, res){
    let retorno = await controleAcesso.montaMenu(grupo);
    let lista = retorno.result;
    //monta o array de paginas
    for(let i = 0; i < lista.length; i++){
        let resultadoMontaPagina = await controleAcesso.montaPaginaMenu(grupo, lista[i].CodigoMenu);
        lista[i].Paginas = resultadoMontaPagina.result;
    }
    retorno.result = lista;
    resposta.montaRetorno(retorno, req, res);
}