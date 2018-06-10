const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT '' AS Sigla 
                    ,NOMEFANTASIA AS Nome 
                    ,CODCOLIGADA AS Codigo 
                    ,CNPJ 
                FROM COLIGADA (NOLOCK) 
                WHERE (CODCOLIGADA IS NOT NULL) 
                ORDER BY SIGLA `; 
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};