const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT DISTINCT UPPER(cDiretoria) AS Diretoria 
                FROM bFolha (NOLOCK) 
                WHERE cDiretoria IS NOT NULL 
                ORDER BY UPPER(cDiretoria)`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};