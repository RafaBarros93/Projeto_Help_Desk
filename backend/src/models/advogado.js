const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoAdvogado = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                  FROM Advogado (NOLOCK) ${parametro}
                  ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(advogado){
    
    let campos = "";
    let valores = "";

    for (key in advogado) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof advogado[key] !== 'object') {
            if (campos === ""){
                campos += key;
                valores += "'" + advogado[key] + "'";
            }
            else {
                campos += "," + key;
                valores += ",'" + advogado[key] + "'";
            }
        }
    };

    let script = `INSERT INTO Advogado (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(advogado){
    
    let valores = "";

    for (key in advogado) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof advogado[key] !== 'object') {
            if (key !== 'CodigoAdvogado'){
                if (valores === ""){
                    valores += key + " ='" + advogado[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + advogado[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Advogado SET ${valores}
                        WHERE CodigoAdvogado = ${advogado.CodigoAdvogado}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Advogado WHERE CodigoAdvogado = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};