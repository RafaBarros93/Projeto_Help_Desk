const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoEstado = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT *
                FROM Estado (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(estado){
    
    let campos = "";
    let valores = "";

    for (key in estado) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof estado[key] !== 'object') {
            if (campos === ""){
                campos += key;
                valores += "'" + estado[key] + "'";
            }
            else {
                campos += "," + key;
                valores += ",'" + estado[key] + "'";
            }
        }
    };

    let script = `INSERT INTO Estado (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(estado){
    
    let valores = "";

    for (key in estado) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof estado[key] !== 'object') {
            if (key !== 'CodigoEstado'){
                if (valores === ""){
                    valores += key + " ='" + estado[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + estado[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Estado SET ${valores}
                        WHERE CodigoEstado = ${estado.CodigoEstado}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Estado WHERE CodigoEstado = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};