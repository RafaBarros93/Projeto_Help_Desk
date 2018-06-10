const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoIndicador = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_INDICADORES_PROCESSO (NOLOCK) ${parametro}`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(indicador){
    
    let campos = "";
    let valores = "";

    for (key in indicador) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof indicador[key] !== 'object') {
            if (key !== 'CodigoIndicador'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + indicador[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + indicador[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO IndicadoresProcesso (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(indicador){
    
    let valores = "";

    for (key in indicador) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof indicador[key] !== 'object') {
            if (key !== 'CodigoIndicador'){
                if (valores === ""){
                    valores += key + " ='" + indicador[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + indicador[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE IndicadoresProcesso SET ${valores}
                        WHERE CodigoIndicador = ${indicador.CodigoIndicador}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM IndicadoresProcesso WHERE CodigoIndicador = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};