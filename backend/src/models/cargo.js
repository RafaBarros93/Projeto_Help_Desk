const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT DISTINCT UPPER(CargoNome) AS Cargo 
                  FROM bFolha (NOLOCK) 
                  WHERE (CargoNome IS NOT NULL)
                  UNION ALL
                  SELECT 'ESTAGIÁRIO' AS Cargo 
                  ORDER BY UPPER(CargoNome) `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};