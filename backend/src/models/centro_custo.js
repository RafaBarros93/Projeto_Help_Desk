const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT DISTINCT UPPER(CentroDeResultadoNome) AS CentroCusto 
                FROM bFolha (NOLOCK) 
                WHERE CentroDeResultadoNome IS NOT NULL 
                ORDER BY UPPER(CentroDeResultadoNome) `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};