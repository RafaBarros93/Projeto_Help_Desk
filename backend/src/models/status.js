const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoStatus = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Status (NOLOCK)
                ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(status){
    
    let script = `INSERT INTO Status (Descricao) VALUES ('${status.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(status){
    
    let script = `UPDATE Status 
                SET Descricao = '${status.Descricao}'
                WHERE CodigoStatus = ${status.CodigoStatus}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Status WHERE CodigoStatus = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};