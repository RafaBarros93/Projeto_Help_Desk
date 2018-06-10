//objeto padrao de resposta
let resposta = {
    success: false,
    mensage: '',
    result: []
};

//funcao que ja trata o retorna das requisicoes
module.exports.montaRetorno = function(retorno, req, res){
    if (retorno.erro != null){
        resposta.success = false;
        resposta.mensage = retorno.erro;
        resposta.result = [];
        res.status(400).json(resposta);
    }
    else {
        resposta.success = true;
        if ((retorno.mensage != '') && (retorno.mensage != null))
            resposta.mensage = retorno.mensage
        else
            resposta.mensage = '';
        if (retorno.result != null)
            resposta.result = retorno.result;
        else 
            resposta.result = [];
        res.status(200).json(resposta);
    }
};