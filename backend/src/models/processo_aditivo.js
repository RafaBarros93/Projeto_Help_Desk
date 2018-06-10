const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    //monta a consulta
    let script = `SELECT Processo.NumeroProcesso
                        ,Processo.Tribunal
                        ,Processo.ValorAtualizado
                        ,Escritorio.Descricao AS Escritorio
                        ,Fase.Descricao AS Fase
                        ,ProbabilidadePerda.Descricao AS Probabilidade
                        ,Processo.Observacao
                        ,ProcessoAditivo.CodigoAditivo
                        ,ProcessoAditivo.ValorContingenciaAtualizado
                    FROM ProcessoAditivo (NOLOCK)
                    LEFT JOIN Processo (NOLOCK) ON ProcessoAditivo.CodigoProcesso = Processo.CodigoProcesso
                    LEFT JOIN Escritorio (NOLOCK) ON ProcessoAditivo.CodigoEscritorio = Escritorio.CodigoEscritorio
                    LEFT JOIN Fase (NOLOCK) ON ProcessoAditivo.CodigoFase = Fase.CodigoFase
                    LEFT JOIN ProbabilidadePerda (NOLOCK) ON ProcessoAditivo.CodigoProbabilidadePerda = ProbabilidadePerda.CodigoProbabilidadePerda
                    WHERE (ProcessoAditivo.CodigoProcesso = ${id})
                    ORDER BY ProcessoAditivo.CodigoAditivo `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(processoAditivo){
    
    let campos = "";
    let valores = "";

    for (key in processoAditivo) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof processoAditivo[key] !== 'object') {
            if (key !== 'CodigoAditivo'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + processoAditivo[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + processoAditivo[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO ProcessoAditivo (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM ProcessoAditivo WHERE CodigoProcesso = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};