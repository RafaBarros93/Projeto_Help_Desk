const propostaTecnica = require('../models/proposta_tecnica');
const resposta = require('../../config/rotinas');

module.exports.get = async function(empreendimento, fornecedor, material, valor, req, res){
    let retorno = await propostaTecnica.get(empreendimento, fornecedor, material, valor);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.put = async function(dados, req, res){
    let retorno = await propostaTecnica.put(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.delete = async function(id, req, res){
    let retorno = await propostaTecnica.delete(id);
    if(retorno.linhasAfetadas <= 0) {
        retorno.mensage = 'Id não localizado';
    }
    resposta.montaRetorno(retorno, req, res);
}

module.exports.post = async function(dados, req, res){
    let retorno = await propostaTecnica.post(dados);
    resposta.montaRetorno(retorno, req, res);
}

module.exports.escolherProposta = async function(dados, req, res){
    let retorno = {};
    for(let i = 0; i < dados.length; i++){
        propostaTecnica.escolherProposta(dados[i]);
    }
    resposta.montaRetorno(retorno, req, res);
}