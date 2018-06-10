const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT DISTINCT UPPER(SituacaoDoEmpregadoStatus) AS Status 
                FROM bFolha (NOLOCK) 
                WHERE SituacaoDoEmpregadoStatus IS NOT NULL 
                ORDER BY UPPER(SituacaoDoEmpregadoStatus)`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};