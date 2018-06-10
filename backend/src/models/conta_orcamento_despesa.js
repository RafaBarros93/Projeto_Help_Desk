const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada, centroCusto,grupo){
    
    //monta a consulta
    let script = `SELECT DISTINCT CONTAORCAMENTO
                FROM OrcDespesasDados
                WHERE (CodColigada = ${coligada})
                AND (CodCUSTO = '${centroCusto}')
                AND (GRUPO = '${grupo}')
                ORDER BY CONTAORCAMENTO`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};