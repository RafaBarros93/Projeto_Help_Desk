const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoObraDepartamento = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM ObraDepartamento (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(obraDepartamento){
    
    let campos = "";
    let valores = "";

    for (key in obraDepartamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof obraDepartamento[key] !== 'object') {
            if (key !== 'CodigoObraDepartamento'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + obraDepartamento[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + obraDepartamento[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO ObraDepartamento (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(obraDepartamento){
    
    let valores = "";
    
    for (key in obraDepartamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof obraDepartamento[key] !== 'object') {
            if (key !== 'CodigoObraDepartamento'){
                if (valores === ""){
                    valores += key + " ='" + obraDepartamento[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + obraDepartamento[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE ObraDepartamento SET ${valores}
                        WHERE CodigoObraDepartamento = ${obraDepartamento.CodigoObraDepartamento}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM ObraDepartamento WHERE CodigoObraDepartamento = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};