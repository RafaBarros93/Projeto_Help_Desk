const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada){
    
    let parametro = 'WHERE CodColigada = ';
    
    // prepara  o parametro
    if(coligada === null)
        parametro = '';
    else 
        parametro += coligada;
    
    //monta a consulta
    let script = `SELECT DISTINCT CODCUSTO AS Codigo
                        ,CENTROCUSTO
                        + CASE WHEN SUBSTRING(CODCUSTO,1,2) = '01' THEN ' - BH'
                            WHEN SUBSTRING(CODCUSTO,1,2) = '02' THEN ' - RJ'
                            ELSE ''
                        END AS CENTROCUSTO
                    FROM OrcDespesasDados ${parametro}
                    ORDER BY CENTROCUSTO`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};
