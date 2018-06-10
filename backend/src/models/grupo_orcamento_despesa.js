const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada, centroCusto){
    
    //monta a consulta
    let script = `SELECT DISTINCT GRUPO
                FROM OrcDespesasDados
                WHERE (CodColigada = ${coligada})
                  AND (CodCUSTO = '${centroCusto}')
                ORDER BY GRUPO`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};