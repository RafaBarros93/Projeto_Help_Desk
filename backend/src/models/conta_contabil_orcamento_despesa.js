const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada, centroCusto, grupo, contaOrcamento){
    
    //monta a consulta
    let script = `SELECT DISTINCT CODCONTA AS Codigo
                    ,CONTACONTABIL
                FROM OrcDespesasDados
                WHERE (CodColigada = ${coligada})
                AND (CodCusto = '${centroCusto}')
                AND (GRUPO = '${grupo}')
                AND (CONTAORCAMENTO = '${contaOrcamento}')
                ORDER BY CONTACONTABIL`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};
