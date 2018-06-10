const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoOportunidadeProblema = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_OPORTUNIDADE_PROBLEMA (NOLOCK) ${parametro}`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(oportunidadeProblema){
    
    let campos = "";
    let valores = "";

    for (key in oportunidadeProblema) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof oportunidadeProblema[key] !== 'object') {
            if (key !== 'CodigoOportunidadeProblema'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + oportunidadeProblema[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + oportunidadeProblema[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO OportunidadeProblema (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(oportunidadeProblema){
    
    let valores = "";

    for (key in oportunidadeProblema) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof oportunidadeProblema[key] !== 'object') {
            if (key !== 'CodigoOportunidadeProblema'){
                if (valores === ""){
                    valores += key + " ='" + oportunidadeProblema[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + oportunidadeProblema[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE OportunidadeProblema SET ${valores}
                        WHERE CodigoOportunidadeProblema = ${oportunidadeProblema.CodigoOportunidadeProblema}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM OportunidadeProblema WHERE CodigoOportunidadeProblema = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};